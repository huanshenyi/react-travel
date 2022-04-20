import React from "react";
import { Divider } from "antd";
import { Filter } from "./Filter";
import styles from "./FilterArea.module.css";

export const FilterArea: React.FC = () => {
  return (
    <>
      <Filter title="路線評価" tags={["1", "2", "3", "4", "5"]} />
      <Divider dashed className={styles["filter-divider"]} />
      <Filter title="出発地" tags={["AA", "BB", "CC", "DD"]} />
      <Divider dashed className={styles["filter-divider"]} />
      <Filter title="日数" tags={["2日", "3日", "4日", "5日", "6日"]} />
      <Divider dashed />
      <Filter
        title="カテゴリ"
        tags={["団体", "自由", "ドライブ", "カスタマイズ"]}
      />
      <Divider dashed />
      <Filter title="出発時刻" tags={["正月", "ゴールデンウィーク", "何か"]} />
    </>
  );
};
