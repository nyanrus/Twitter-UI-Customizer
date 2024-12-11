import tuicLogo from "./assets/tuic-twitter-profile.jpg?url";

import { styles as style, text } from "./m.module.css";

export function MessagePreview(mention_color: string, gray_color: string) {
    return (
        <div class={style.root}>
            <div
                class={style.root2}
            >
                <div
                    class={style.image_root}
                >
                    <img
                        width="40px"
                        height="40px"
                        src={chrome.runtime.getURL(tuicLogo)}
                        class={style.profile_image}
                        onDragStart={(ev) => ev.preventDefault()}
                    />
                </div>
                <div class={style.message}>
                    <div
                        class={style.profile_root}
                    >
                        <a class={style.profile_username}>
                            【公式】UI Customizer by Ablaze
                        </a>
                        <div class={style.profile_id} style={{ color: gray_color }}>@tuic_official</div>
                    </div>
                    <div>
                        Twitter UI Customizer は、
                        <a class={style.mention} style={{ color: mention_color }}>@kaonasi_biwa</a>
                        {" "}
                        を筆頭に、
                        {" "}
                        <br />
                        多数の開発者によって
                        <br />
                        オープンソースソフトウェアとして開発されています。
                    </div>
                </div>
            </div>
            <style>
                {text}
            </style>
        </div>
    );
}
