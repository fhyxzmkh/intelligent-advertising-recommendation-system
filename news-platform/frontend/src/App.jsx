import axios from "axios";
import { useEffect, useState } from "react";
import { SearchBar } from "./components/SearchBar.jsx";

import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { useCookies } from "react-cookie";
import { NewsList } from "./components/NewsList.jsx";

const url =
  "https://newsapi.org/v2/everything?" +
  "q=数码&" +
  "sortBy=popularity&" +
  "apiKey=93c9087a0cb141bd8ad71e67361892cf";

const testData = [
  {
    source: {
      id: null,
      name: "Williamlong.info",
    },
    author: "user@gmail.com (guest)",
    title: "字节跳动起诉前实习生索赔800万",
    description:
      "据南都记者获悉，字节跳动起诉前实习生田某某篡改代码攻击公司内部模型训练一案，已获北京市海淀区人民法院正式受理。字节跳动请求法院，判令田某某赔偿公司侵权损失800万元及合理支出2万元，并公开赔礼道歉。\n\n据南都记者了解，2024年10月，有媒体称“字节大模型训练任务被实习生攻击”，并有网传信息称“涉及8000多卡、损失上千万美元”。后字节跳动通过官方账号发布事实澄清，称确有实习生发生严重违纪，涉事实习生已于2024年8月被公司辞退。\n\n\n字节跳动：关于“实习生破坏大模型训练”的事实澄清\r\n\n\n近期有媒体称“字节跳动…",
    url: "https://www.williamlong.info/archives/7472.html",
    urlToImage: null,
    publishedAt: "2024-11-25T13:35:00Z",
    content: "",
  },
  {
    source: {
      id: null,
      name: "Appinn.com",
    },
    author: "青小蛙",
    title: "29 年后，正版 WinRAR 终于来了",
    description:
      "WinRAR 是一款诞生自 1995 年的经典解压缩工具，在全球超过 5亿用户，几乎无人不晓。由俄罗斯程序员 Eugene Roshal 开发，他也是专有压缩算法 RAR 的发明人。目前其官网在售版本上架数码荔枝，永久授",
    url: "https://www.appinn.com/winrar/",
    urlToImage:
      "https://www.appinn.com/wp-content/uploads/2024/11/Appinn-Feature-images-2024-11-28T141542.151.jpg",
    publishedAt: "2024-11-28T06:40:49Z",
    content:
      "WinRAR 1995 5 Eugene Roshal RAR @Appinn\r\nWinRAR \r\nWinRAR 1 \r\n WinRAR \r\nRAR win.rar GmbH RAR RAR\r\nWindows \r\nRAR WinRAR RARZIP 7ZISOJAR \r\nN \r\n RAR WinRAR \r\nWinRAR \r\nWinRAR exe Win \r\nWinRAR AES \r\nWinRAR… [+63 chars]",
  },
  {
    source: {
      id: null,
      name: "Appinn.com",
    },
    author: "青小蛙",
    title:
      "双 12 大促 6 折起！Fences 5、Groupy 2、UPDF 等热门软件无套路直降[12月13日晚截止]",
    description:
      "2024 双 12 大促来啦！我们的朋友「数码荔枝」照例为大家带来正版软件的折扣优惠！多款热门办公工具正参与限时特惠，赶紧趁低至 6 折的优惠入手吧～活动自即日起至 12 月 13 日晚，参与活动的软件超过 30 款！S",
    url: "https://www.appinn.com/lizhi-24-1212/",
    urlToImage:
      "https://www.appinn.com/wp-content/uploads/2024/12/appinn-homework-22.jpg",
    publishedAt: "2024-12-05T14:01:16Z",
    content:
      "2024 12 \r\n6 \r\n12 13 30 \r\n<ul><li>Stardock 7 Start11FencesGroupy </li><li>RoboForm Everywhere79 </li><li>UPDF &amp; UPDF AI PDF 125 </li><li></li></ul>GoodSyncBartender 5Connectify Hotspot\r\nStardock 1… [+743 chars]",
  },
];

function App() {
  const [uuid, setUuid] = useState("");

  const [newsList, setNewsList] = useState(testData);

  const [cookies, setCookie, removeCookie] = useCookies(["user_id"]);

  useEffect(() => {
    // 初始化 FingerprintJS
    const fpPromise = FingerprintJS.load();

    // 生成浏览器指纹
    fpPromise
      .then((fp) => fp.get())
      .then((result) => {
        // 将指纹存储到 uuid 状态 : 316da16e73592d7db2fca275b2c28fe4
        setUuid(result.visitorId);
        setCookie("user_id", uuid);
      })
      .catch((error) => {
        console.error("Failed to generate fingerprint:", error);
      });
  }, [setCookie, uuid]);

  // useEffect(() => {
  //   axios
  //     .get(url)
  //     .then((response) => {
  //       console.log(response.data.articles);
  //     })
  //     .catch((error) => {
  //       console.error("There was an error!", error);
  //     });
  // }, []);

  return (
    <>
      <div className="main-container">
        <SearchBar setNewsList={setNewsList} />
        <NewsList />
      </div>
    </>
  );
}

export default App;
