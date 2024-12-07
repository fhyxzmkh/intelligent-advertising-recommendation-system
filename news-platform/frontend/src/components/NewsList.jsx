import { Tag } from "antd";

export const NewsList = () => {
  const handleClick = (category) => {};

  return (
    <>
      <div className="search-container m-4 flex justify-evenly">
        <Tag
          className="w-1/5 text-center font-bold cursor-pointer"
          color="red"
          onClick={handleClick("全部")}
        >
          全部
        </Tag>
        <Tag
          className="w-1/5 text-center font-bold cursor-pointer"
          color="red"
          onClick={handleClick("运动")}
        >
          运动
        </Tag>
        <Tag
          className="w-1/5 text-center font-bold cursor-pointer"
          color="volcano"
          onClick={handleClick("数码")}
        >
          数码
        </Tag>
        <Tag
          className="w-1/5 text-center font-bold cursor-pointer"
          color="orange"
          onClick={handleClick("考研")}
        >
          考研
        </Tag>
        <Tag
          className="w-1/5 text-center font-bold cursor-pointer"
          color="gold"
          onClick={handleClick("编程")}
        >
          编程
        </Tag>
      </div>
    </>
  );
};
