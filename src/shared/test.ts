import { TUICPref } from "./settings";

const settings = TUICPref.getInstance().settings;

settings.XToTwitter.PostToTweet = true;

console.log(TUICPref.getInstance().settings.XToTwitter);
