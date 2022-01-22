import React from "react";
import logo from "../../assets/logo.svg"
import styles from "./Header.module.css"
import { Layout, Typography, Input , Menu, Button, Dropdown} from "antd";
import { GlobalOutlined } from "@ant-design/icons"
import { withRouter, RouteComponentProps } from "react-router-dom";
import { RootState } from "../../redux/store";
import { withTranslation, WithTranslation } from "react-i18next";
import { addLanguageActionCreator, changeLanguageActionCreator } from "../../redux/language/languageActions";
import { connect } from "react-redux";
import { Dispatch } from "redux";


const mapStateToProps = (state: RootState) => {
  return {
    language: state.language.language,
    languageList: state.language.languageList,
  }
}

const mapDispatchProps = (dispatch: Dispatch) => {
  return {
    changeLanguage:(code:"zh"|"en")=> {
      const action = changeLanguageActionCreator(code)
      dispatch(action);
    },
    addLanguage: (name:string, code:string) => {
      const action = addLanguageActionCreator(name, code)
      dispatch(action);
    },
  }
};

type PropsType = RouteComponentProps & WithTranslation & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchProps>

class HeaderComponnet extends React.Component<PropsType> {

  menuClickHandler = (e) => {
    if(e.key === "new") {
      //新規追加アクション
      this.props.addLanguage("newlangeuga", "new_lang")
    }else{
      this.props.changeLanguage(e.key)
    }
  };
    render(){
      const { history, t } = this.props;
      return (
        <div className={styles['app-header']}>
        <div className={styles['top-header']}>
         <div className={styles.inner}>
         <Typography.Text>{t("header.slogan")}</Typography.Text>
          <Dropdown.Button style={{marginLeft:15}} overlay={
            <Menu onClick={this.menuClickHandler}>
              {
                this.props.languageList.map((l)=>{
                  return <Menu.Item key={l.code}>{l.name}</Menu.Item>
                })
              }
              <Menu.Item key={"new"}>{t("header.add_new_language")}</Menu.Item>
            </Menu>
          }
          icon={<GlobalOutlined/>}>
            {this.props.language === 'zh' ? 'en' : 'English'}
            </Dropdown.Button>
            <Button.Group className={styles['button-group']}>
              <Button onClick={()=> history.push('/register')}>新規登録</Button>
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
}

export const Header = connect(mapStateToProps, mapDispatchProps)(withTranslation()(withRouter(HeaderComponnet)));