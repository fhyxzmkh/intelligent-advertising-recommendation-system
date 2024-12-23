import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import { Advertise } from "./components/Advertise.jsx";
import { SearchBar } from "./components/SearchBar.jsx";
import { ProductList } from "./components/ProductList.jsx";
import { CategoryBrowse } from "./components/CategoryBrowse.jsx";

import { useVisitorData } from "@fingerprintjs/fingerprintjs-pro-react";

function App() {
  const [uuid, setUuid] = useState("");
  const [products, setProducts] = useState([]);
  const [shoppingCartGoods, setShoppingCartGoods] = useState([]);

  const [cookies, setCookie, removeCookie] = useCookies(["user_id"]);

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

  return (
    <>
      <div className="main-container">
        <Advertise
          cookies={cookies}
          setCookie={setCookie}
          removeCookie={removeCookie}
        />
        <SearchBar
          setProducts={setProducts}
          cookies={cookies}
          setCookie={setCookie}
          removeCookie={removeCookie}
          shoppingCartGoods={shoppingCartGoods}
          setShoppingCartGoods={setShoppingCartGoods}
        />
        <CategoryBrowse
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
          setShoppingCartGoods={setShoppingCartGoods}
        />
      </div>
    </>
  );
}

export default App;
