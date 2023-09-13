// 多分フォーマットが違う（minor,patchの変更)などはそのままSettingsに入れてもOKかも
// 参照：Qiita 「TypeScriptのInterfaceとTypeの比較」@tkrkt
// https://uyamazak.hatenablog.com/entry/2020/11/06/111857

//https://zenn.dev/uttk/articles/bd264fa884e026
//https://typescriptbook.jp/reference/object-oriented/interface/instanceof-and-interfaces#%E8%A4%87%E9%9B%91%E3%81%AA%E3%82%A4%E3%83%B3%E3%82%BF%E3%83%BC%E3%83%95%E3%82%A7%E3%83%BC%E3%82%B9%E3%81%AE%E5%88%A4%E5%AE%9A%E3%81%AFzod%E3%81%8C%E4%BE%BF%E5%88%A9
import { zS0_1_0, TS0_1_0 } from "./versions/0_1_0";

const zSettings = zS0_1_0;
type TSettings = TS0_1_0;
export { zSettings, TSettings };
