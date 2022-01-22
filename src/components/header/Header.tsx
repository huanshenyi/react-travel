import React from "react";
import logo from "../../assets/logo.svg"
import styles from "./Header.module.css"
import { Layout, Typography, Input , Menu, Button, Dropdown} from "antd";
import { GlobalOutlined } from "@ant-design/icons"
import {useHistory, useLocation, useParams, useRouteMatch} from "react-router-dom";
import { useSelector } from "../../redux/hooks";
import { useDispatch } from "react-redux";
import { 
   addLanguageActionCreator,
    changeLanguageActionCreator }
     from "../../redux/language/languageActions";
import { useTranslation } from "react-i18next";
import { RootState } from "../../redux/store";

export const Header: React.FC= (props)=>{
  const history = useHistory();
  const location = useLocation();
  const params = useParams();
  const match = useRouteMatch();
  const language = useSelector((state: RootState) => state.language.language);
  const languageList = useSelector((state) => state.language.languageList);
  const dispatch = useDispatch();
  // const dispatch = useDispatch<Dispatch<LanguageActionTypes>>();
  const {t} = useTranslation();

  const menuClickHandler = (e) => {
    if(e.key === "new"){
      dispatch(addLanguageActionCreator("newlnag", "new_lang"))
    }else {
      dispatch(changeLanguageActionCreator(e.key))
    }
  }

    return (
        <div className={styles['app-header']}>
        <div className={styles['top-header']}>
         <div className={styles.inner}>
         <Typography.Text>幸せの旅行</Typography.Text>
          <Dropdown.Button style={{marginLeft:15}} overlay={
            <Menu onClick={menuClickHandler}>
              {
                languageList.map((l)=> {
                  return <Menu.Item key={l.code}>{l.name}</Menu.Item>
                })
              }
            <Menu.Item key={"new"}>{t("header.add_new_language")}</Menu.Item>
            </Menu>
          }
          icon={<GlobalOutlined/>}>
            言語
            </Dropdown.Button>
            <Button.Group className={styles['button-group']}>
              <Button onClick={()=> history.push('/register')}>{t("header.register")}</Button>
              <Button onClick={()=> history.push('/signIn')}>ログイン</Button>
            </Button.Group>
         </div>
        </div>
        <Layout.Header className={styles['main-header']}>
          <span onClick={()=>history.push("/")}>
            <img src={logo} alt="" className={styles['App-logo']}/>
            <Typography.Title level={3} className={styles.title}>React 旅行</Typography.Title>
          </span>
          <Input.Search placeholder="目的地を入力してください" className={styles['search-input']}></Input.Search>
        </Layout.Header>
        <Menu mode={'horizontal'} className={styles['main-menu']}>
          <Menu.Item key={1}>ホーム</Menu.Item>
          <Menu.Item key={2}>週末ツーア</Menu.Item>
          <Menu.Item key={2}>団体ツーア</Menu.Item>
        </Menu>
      </div>
    )
}