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
    const fpPromise = FingerprintJS.load();

    fpPromise
      .then((fp) => fp.get())
      .then((result) => {
        setUuid(result.visitorId); // 仅更新状态
      })
      .catch((error) => {
        console.error("Failed to generate fingerprint:", error);
      });
  }, []);

  useEffect(() => {
    if (uuid) {
      setCookie("user_id", uuid, { path: "/" });
    }
  }, [uuid, setCookie]);

  useEffect(() => {
    const getNewsList = async () => {
      try {
        const resp = await axios.get("http://101.43.35.186:8101/api/newsList");
        setNewsList(resp.data.newslist);
        //console.log(resp.data.articles.slice(0, 5));
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
