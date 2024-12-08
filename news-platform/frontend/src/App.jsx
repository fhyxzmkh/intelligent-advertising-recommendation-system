import axios from "axios";
import { useEffect, useState } from "react";
import { SearchBar } from "./components/SearchBar.jsx";

import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { useCookies } from "react-cookie";
import { NewsList } from "./components/NewsList.jsx";
import { Advertise } from "./components/Advertise.jsx";

function App() {
  const [uuid, setUuid] = useState("");

  const [newsList, setNewsList] = useState([]);

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

  useEffect(() => {
    const getNewsList = async () => {
      try {
        const resp = await axios.get(
          "https://newsapi.org/v2/top-headlines?country=us&apiKey=93c9087a0cb141bd8ad71e67361892cf",
        );
        setNewsList(resp.data.articles);
        console.log(resp.data.articles.slice(0, 5));
      } catch (error) {
        console.error("Error searching news:", error);
      }
    };

    getNewsList();
  }, []);

  return (
    <>
      <div className="main-container">
        <Advertise
          cookies={cookies}
          setCookie={setCookie}
          removeCookie={removeCookie}
        />
        <SearchBar
          setNewsList={setNewsList}
          cookies={cookies}
          setCookie={setCookie}
          removeCookie={removeCookie}
        />
        <NewsList
          cookies={cookies}
          setCookie={setCookie}
          removeCookie={removeCookie}
          newsList={newsList}
          setNewsList={setNewsList}
        />
      </div>
    </>
  );
}

export default App;
