const axios = require("axios");
const sha256 = require("sha256");
const appKey = "3225af7b1ff2a449";
const key = "INQBz7GBDD7Mpk8MY5xomY9rnhbbexM4";

module.exports = async function youdao(query) {
  const signQuery =
    query.length > 20
      ? query.substr(0, 10) + query.length + query.substr(query.length - 10, 10)
      : query;
  const salt = new Date().getTime();
  const curtime = Math.round(new Date().getTime() / 1000);
  const from = "auto";
  const to = "auto";
  const str1 = appKey + signQuery + salt + curtime + key;
  const sign = sha256(str1);

  const res = await axios.get("https://openapi.youdao.com/api", {
    params: {
      q: query,
      from,
      to,
      appKey,
      salt,
      sign,
      signType: "v3",
      curtime
    }
  });
  return res.data;
};
