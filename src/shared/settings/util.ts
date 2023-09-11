import z, { ZodTypeAny } from "zod";

/**
 * omitで、変換先の衝突するKeyを削除するため
 * {
 *    [key] : true,
 * }
 * の配列をつくります
 */
const makeArrKeyForOmit = <T extends z.ZodRawShape, R extends z.ZodRawShape>(
    obj: z.ZodObject<T>,
    mask: {
        [k in keyof T]?: keyof R;
    },
) => {
    const objKeys = z.util.objectKeys(obj.shape);
    let temp = {};
    objKeys.forEach((k) => {
        if (mask[k]) {
            const key = k;
            temp = { ...temp, [key]: true };
        }
    });
    return temp;
};

/**
 * extendで、変換元のKeyを受け入れるため
 * {
 *    [value] : [key.shape],
 * }
 * の配列をつくります
 */
const makeArrValueShapeForExtend = <T extends z.ZodRawShape, R extends z.ZodRawShape>(
    obj: z.ZodObject<T>,
    mask: {
        [k in keyof T]?: keyof R;
    },
) => {
    const objKeys = z.util.objectKeys(obj.shape);
    let temp = {};
    objKeys.forEach((k) => {
        if (mask[k]) {
            const key = k;
            const value = mask[k] as unknown as string;
            temp = { ...temp, [value]: obj.shape[key] };
        }
    });
    return temp;
};

/**
 * transformで、変換先に変換元を代入するために
 * {
 *    [key] : [value],
 * }
 * の配列をつくります
 */
const makeArrKeyEqValue = <T extends z.ZodRawShape, R extends z.ZodRawShape, C extends ZodTypeAny>(
    arg: z.objectOutputType<
        { [k in keyof Omit<Omit<T, never>, never>]: Omit<Omit<T, never>, never>[k] },
        C
    >,
    obj: z.ZodObject<T>,
    mask: {
        [k in keyof T]?: keyof R;
    },
) => {
    const objKeys = z.util.objectKeys(obj.shape);
    let temp = {};
    objKeys.forEach((k) => {
        // if (mask[k]) {
        console.log(mask[k] as unknown as string);
        const key = k;
        let value = mask[k] as unknown as string;
        if (!value) value = k;
        temp = { ...temp, [key]: arg[value] };
        // }
    });
    return temp;
};

const makeArrKeyEqValueCurry = <
    T extends z.ZodRawShape,
    R extends z.ZodRawShape,
    C extends ZodTypeAny,
>(
    obj: z.ZodObject<T>,
    mask: {
        [k in keyof T]?: keyof R;
    },
) => {
    return (
        arg: z.objectOutputType<
            { [k in keyof Omit<Omit<T, never>, never>]: Omit<Omit<T, never>, never>[k] },
            C
        >,
    ) => {
        return makeArrKeyEqValue(arg, obj, mask);
    };
};

const rename = <
    T extends z.ZodRawShape,
    K extends z.UnknownKeysParam,
    C extends z.ZodTypeAny,
    R extends z.ZodRawShape,
>(
    obj: z.ZodObject<T, K, C>,
    mask: {
        [k in keyof T]?: keyof R;
    },
): z.ZodEffects<z.ZodTypeAny> => {
    /**
     * 前提： Zodではremapメソッドをサポートしていません。
     * remapを実装するためには、
     * 変換先の情報をもとに
     * 1. 変換先と変換元で衝突するKeyを削除
     * 2. 変換元の値を受け入れるために必要なKeyを追加
     * 3. 変換元のValueを変換先のKeyに代入する
     * 必要があります。
     */
    const objKeys = z.util.objectKeys(obj.shape);
    console.log(objKeys);

    return obj
        .omit(makeArrKeyForOmit<T, R>(obj, mask))
        .extend(makeArrValueShapeForExtend(obj, mask))
        .transform(makeArrKeyEqValueCurry(obj, mask));
};

declare module "zod" {
    interface ZodObject<
        T extends z.ZodRawShape,
        UnknownKeys extends z.UnknownKeysParam = z.UnknownKeysParam,
        Catchall extends z.ZodTypeAny = z.ZodTypeAny,
        Output = z.objectOutputType<T, Catchall, UnknownKeys>,
        Input = z.objectInputType<T, Catchall, UnknownKeys>,
    > {
        tuicRename: <
            T extends z.ZodRawShape,
            K extends z.UnknownKeysParam,
            C extends z.ZodTypeAny,
            R extends z.ZodRawShape,
        >(
            this: z.ZodObject<T, K, C>,
            mask: {
                [k in keyof T]?: keyof R;
            },
        ) => z.ZodEffects<z.ZodTypeAny>;
    }
}
function tuicRename<
    T extends z.ZodRawShape,
    K extends z.UnknownKeysParam,
    C extends z.ZodTypeAny,
    R extends z.ZodRawShape,
>(
    this: z.ZodObject<T, K, C>,
    mask: {
        [k in keyof T]?: keyof R;
    },
) {
    return rename(this, mask);
}

z.ZodObject.prototype.tuicRename = tuicRename;

export { rename };
