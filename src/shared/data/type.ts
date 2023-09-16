// import z from "zod";

import z from "zod";

// const zColor = z
//     .number()
//     .int()
//     .min(0)
//     .max(255)
//     .or(z.string().regex(/[0-1]??[0-9][0-9]%/g));

// type TColor = z.infer<typeof zColor>;

// class RGBA {
//     r: TColor;
//     g: TColor;
//     b: TColor;
//     a: TColor;
//     constructor(r: TColor, g: TColor, b: TColor, a: TColor) {
//         this.r = r;
//         this.g = g;
//         this.b = b;
//         this.a = a;
//     }
//     toString(): string {
//         return `rgb(${this.r},${this.g},${this.b}/${this.a})`;
//     }
// }

// class BtnColors {
//     background: RGBA;
//     border: RGBA;
//     color: RGBA;
//     constructor(background: RGBA, border: RGBA, color: RGBA) {
//         this.background = background;
//         this.border = border;
//         this.color = color;
//     }
// }

const zBtnColors = z.object({
    background: z.string(),
    border: z.string(),
    color: z.string(),
});

const zIcnColors = z.object({
    color: z.string(),
    typeColor: z.string(),
    ldColor: z.boolean().optional(),
});

type BtnColors = z.infer<typeof zBtnColors>;

type IcnColors = z.infer<typeof zIcnColors>;

export { zBtnColors, BtnColors, zIcnColors, IcnColors };
// "unsent-tweet": {
//     background: "rgba(29,161,242,1)",
//     border: "rgba(29,161,242,1)",
//     color: "rgba(255,255,255,1)",
// },
