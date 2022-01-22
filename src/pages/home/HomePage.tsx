import React from "react";

import {Header, Footer, Carousel, SideMenu, ProductCollection} from "components";
import { Row, Col, Typography, Spin } from "antd";
import sideImage from '../../assets/images/sider_2019_12-09.png';
import sideImage2 from '../../assets/images/sider_2019_02-04.png';
import sideImage3 from '../../assets/images/sider_2019_02-04-2.png';
import styles from './HomePage.module.css';
import { withTranslation, WithTranslation } from "react-i18next";
import {connect} from "react-redux";
import { RootState} from "../../redux/store";
import { 
    giveMeDataActionCreator
   } from "../../redux/recommendProducts/recommendProductsActions";


const mapStateToProps = (state: RootState) => {
  return {
    loading: state.recommendPoducts.loading,
    error: state.recommendPoducts.error,
    productList: state.recommendPoducts.productList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    giveMeDate: () => {
      dispatch(giveMeDataActionCreator());
    }
  }
}

type propstype = WithTranslation & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

class HomePageCompont extends React.Component<propstype> {

componentDidMount() {
    this.props.giveMeDate();
}

    render() {
      const {t, productList, loading, error} = this.props;
      if(loading){
        return <Spin
        size="large"
        style={
          {
            marginTop:200,
            marginBottom:200,
            marginLeft:"auto",
            marginRight:"auto",
            width:"100%",
          }
        }
        />
      }
      if (error) {
        return <div>err: {error}</div>;
      }
      return <>
      <Header/>
<div className={styles['page-content']}>
 <Row style={{marginTop:20}}>
   <Col span={6}>
     <SideMenu/>
   </Col>
   <Col span={18}>
    <Carousel/>
   </Col> 
 </Row>
 <ProductCollection
  title={<Typography.Title level={3} type='warning'>{t("home_page.hot_recommended")}</Typography.Title>}
  sideImage={sideImage}
  products={productList[0].touristRoutes}
 />
          <ProductCollection
  title={<Typography.Title level={3} type='danger'>{t("home_page.new_arrival")}</Typography.Title>}
  sideImage={sideImage2}
  products={productList[1].touristRoutes}
 />
          <ProductCollection
  title={<Typography.Title level={3} type='success'>{t("home_page.domestic_travel")}</Typography.Title>}
  sideImage={sideImage3}
  products={productList[2].touristRoutes}
 />
</div>
<Footer/>
</>
    }
    
}

export const HomePage = connect(mapStateToProps, mapDispatchToProps)(withTranslation()(HomePageCompont))