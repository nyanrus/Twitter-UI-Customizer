// WORK IN PROGRESS 👷‍♂

export const selectors = {
    icon: {
        favicon: `link[rel="shortcut icon"]`,
        //左上のあれ
        mainIcon: `header h1 a > div > svg`,
        mainIconBase: `header [role="heading"]`,

        //TODO: どこにあるかわからん
        alert: `[role="alertdialog"] [data-testid="confirmationSheetDialog"] > svg`,

        //TODO: ロード時？
        interstitialGraphic: `[data-testid="interstitialGraphic"] > svg`,

        //TODO: どこにあるかわからん
        topNavBar: `#layers [data-testid="TopNavBar"] div+svg`,
    },
};
