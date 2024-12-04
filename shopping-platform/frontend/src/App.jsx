import { useEffect, useState } from "react";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { useCookies } from "react-cookie";

import { Advertise } from "./components/Advertise.jsx";
import { SearchBar } from "./components/SearchBar.jsx";
import { ProductList } from "./components/ProductList.jsx";

function App() {
  const [uuid, setUuid] = useState("");
  const [products, setProducts] = useState([]);

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

  return (
    <>
      <div className="main-container">
        <Advertise />
        <SearchBar
          setProducts={setProducts}
          cookies={cookies}
          setCookie={setCookie}
          removeCookie={removeCookie}
        />
        <ProductList
          products={products}
          setProducts={setProducts}
          cookies={cookies}
          setCookie={setCookie}
          removeCookie={removeCookie}
        />
      </div>
    </>
  );
}

export default App;
