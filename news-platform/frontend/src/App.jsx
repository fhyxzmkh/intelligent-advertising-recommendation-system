import axios from "axios";
import { useEffect, useState } from "react";
import { SearchBar } from "./components/SearchBar.jsx";

import { useCookies } from "react-cookie";
import { NewsList } from "./components/NewsList.jsx";
import { Advertise } from "./components/Advertise.jsx";

import { useVisitorData } from "@fingerprintjs/fingerprintjs-pro-react";

function App() {
  const [uuid, setUuid] = useState("");

  const [newsList, setNewsList] = useState([]);

  const [cookies, setCookie, removeCookie] = useCookies([
    "user_id",
    "digit_score",
    "sport_score",
    "program_score",
    "edu_score",
  ]);

  const { isLoading, error, data, getData } = useVisitorData(
    { extendedResult: true },
    { immediate: true },
  );

  // useEffect(() => {
  //   const fpPromise = FingerprintJS.load();
  //
  //   fpPromise
  //     .then((fp) => fp.get())
  //     .then((result) => {
  //       setUuid(result.visitorId); // 仅更新状态
  //     })
  //     .catch((error) => {
  //       console.error("Failed to generate fingerprint:", error);
  //     });
  // }, []);

  useEffect(() => {
    if (data?.visitorId) {
      setUuid(data.visitorId);
    }
  }, [data]);

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

  useEffect(() => {
    const updateDB = async () => {
      await axios
        .post("http://101.43.35.186:8102/api/advertise/update-db", {
          type: "news",
          apiKey: "5c10c5d5-f007-4d84-af2d-a0d5dac5370e",
          user_id: `${cookies.user_id}`,
          sport_score: `${cookies.sport_score !== undefined ? cookies.sport_score : 0}`,
          digit_score: `${cookies.digit_score !== undefined ? cookies.digit_score : 0}`,
          program_score: `${cookies.program_score !== undefined ? cookies.program_score : 0}`,
          edu_score: `${cookies.edu_score !== undefined ? cookies.edu_score : 0}`,
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };

    updateDB();
  }, [cookies]);

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
