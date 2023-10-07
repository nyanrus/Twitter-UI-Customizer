/**
 * Twitter-Like UI API
 */

/**
 * Twitterのダイアログ風要素
 */
export class Dialog {
    /**
     * @param {string} title ダイアログのタイトル
     * @param {{
     *     hasPadding: boolean?;
     *     fitContentWidth: boolean?;
     * }} options オプション
     */
    constructor(title, options = {}) {
        this.element = new DOMParser().parseFromString(`
            <div class="tlui tlui-dialog has-padding">
                <div class="tlui-container">
                    <h1>${title}</h1>
                </div>
            </div>
            `, "text/html").body.children[0];
        this.container = this.element.querySelector("div");

        for (const [key, value] of Object.entries(Object.assign({}, options))) {
            this[key] = value;
        }
    }

    #refresh() {
        if (document.querySelector("#layers .tlui-dialog")) {
            document.documentElement.classList.add("tlui-has-dialog");
        } else {
            document.documentElement.classList.remove("tlui-has-dialog");
        }
    }

    /**
     * ダイアログの幅をコンテンツの幅に合わせるかどうか（初期値: `false`）
     * @type boolean
     */
    get fitContentWidth() {
        return this.element.classList.contains("fit-content-width");
    }
    set fitContentWidth(value) {
        if (value) {
            this.element.classList.add("fit-content-width");
        } else {
            this.element.classList.remove("fit-content-width");
        }
    }

    /**
     * パディングをつけるかどうか（初期値: `true`）
     * @type boolean
     */
    get hasPadding() {
        return this.element.classList.contains("has-padding");
    }
    set hasPadding(value) {
        if (value) {
            this.element.classList.add("has-padding");
        } else {
            this.element.classList.remove("has-padding");
        }
    }

    /**
     * コンポーネントを追加します。
     * @param {(string | Component)[]} components コンポーネント
     * @returns {Dialog}
     */
    addComponents(components) {
        for (const component of components) {
            if (typeof component === "string") {
                const p = document.createElement("p");
                p.textContent = component;
                this.container.appendChild(p);
            } else {
                this.container.appendChild(component.element);
            }
        }
        return this;
    }

    /**
     * ダイアログを開きます。
     * @returns {Dialog}
     */
    open() {
        document.querySelector("#layers").appendChild(this.element);
        this.#refresh();
        return this;
    }

    /**
     * ダイアログを閉じます。
     * @returns {Dialog}
     */
    close() {
        this.element.remove();
        this.#refresh();
        return this;
    }
}

/**
 * コンポーネント
 */
export class Component {
    constructor() {
        this.element = null;
        // TypeScript 採用してくれたらここは interface に置き換えします…。いちいち継承クラスの constructor で super をやっていたらめんどくさいな…っていう……。
    }
}

/**
 * コンテナ
 */
export class ContainerComponent extends Component {
    /**
     * @param {(Node | Component)[]} elements 内包する要素
     */
    constructor(elements) {
        super();
        this.element = document.createElement("div");
        this.element.classList.add("tlui-container");

        for (const element of elements) {
            if (element instanceof Component) {
                this.element.appendChild(element.element);
            } else {
                this.element.appendChild(element);
            }
        }
    }
}

/**
 * Twitterのボタン風要素
 */
export class ButtonComponent extends Component {
    /**
     * @param {string} text ボタンテキスト
     * @param {Function} onclick クリックイベント
     * @param {{
     *     fullWidth: boolean?;
     *     invertColor: boolean?;
     * }} options オプション
     */
    constructor(text, onclick, options = {}) {
        super();
        this.element = new DOMParser().parseFromString(`
            <button type="button" class="full-width">${text}</button>
            `, "text/html").body.children[0];
        this.onclick = onclick;

        this.element.onclick = onclick;

        for (const [key, value] of Object.entries(Object.assign({}, options))) {
            this[key] = value;
        }
    }

    /**
     * ボタンの幅を最大にするかどうか（初期値: `true`）
     * @type boolean
     */
    get fullWidth() {
        return this.element.classList.contains("full-width");
    }
    set fullWidth(value) {
        if (value) {
            this.element.classList.add("full-width");
        } else {
            this.element.classList.remove("full-width");
        }
    }

    /**
     * ボタンの色を反転させるかどうか（初期値: `false`）
     * @type boolean
     */
    get invertColor() {
        return this.element.classList.contains("invert-color");
    }
    set invertColor(value) {
        if (value) {
            this.element.classList.add("invert-color");
        } else {
            this.element.classList.remove("invert-color");
        }
    }
}