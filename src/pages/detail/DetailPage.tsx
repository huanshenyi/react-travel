import React, {useState, useEffect} from "react"
import {RouteComponentProps, useParams} from 'react-router-dom';
import axios from "axios";
import { Spin, Row, Col, Divider, Transfer, Typography, Anchor, Menu } from "antd";
import { DatePicker } from "antd";
import styles from "./DetailPage.module.css";
import { Header, Footer, ProductIntro, ProductComments } from "../../components"
import { commentMockData } from "./mockup";

interface MatchParams {
    touristRouteId: string
}

export const DetailPage: React.FC<RouteComponentProps<MatchParams>> = (props) => {

    const { touristRouteId } = useParams<MatchParams>()
    const [loading, setLoading] = useState<boolean>(true);
    const [product, setProduct] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const { RangePicker } = DatePicker;
    useEffect(() => {
      const fetchDate = async() => {
         setLoading(true);
         try {
            const {data} = await axios.get(`http://123.56.149.216:8080/api/touristRoutes/${touristRouteId}`)
            setProduct(data);
            setLoading(false);
         }catch(e ){
             if (e instanceof Error) {
                setError(e.message)
                setLoading(false);
             }
         }
      }
      fetchDate();
    }, [])
    if (loading) {
        return (
            <Spin 
            size="large"
            style={{
                marginTop: 200,
                marginBottom: 200,
                marginLeft: "auto",
                marginRight: "auto",
                width: "100%"
            }}
            />
        )
    }
    if(error) {
        return <div>Error: {error}</div>
    }
    return <>
      <Header/>
        <div className={styles['page-content']}>
         {/* 簡単紹介　日時の選択*/}
         <div className={styles["product-intro-container"]}>
             <Row>
                 <Col span={13}>
                     <ProductIntro 
                     title={product.title}
                     shortDescription={product.shortDescription}
                     price={product.price}
                     coupons={product.coupons}
                     points={product.points}
                     discount={product.discount}
                     rating={product.rating}
                     pictures={product.touristRoutePictures.map((p) => p.url)}
                     />
                 </Col>
                 <Col span={11}>
                     <RangePicker open style={{marginTop:20}}/>
                 </Col>
             </Row>
         </div>
         {/*メニュー*/}
         <Anchor className={styles["product-detail-anchor"]}>
          <Menu mode="horizontal">
           <Menu.Item key="1">
               <Anchor.Link href="#feature" title="差別点"></Anchor.Link>
           </Menu.Item>
           <Menu.Item key="3">
               <Anchor.Link href="#fees" title="費用"></Anchor.Link>
           </Menu.Item>
           <Menu.Item key="4">
               <Anchor.Link href="#notes" title="予約の事前お知らせ"></Anchor.Link>
           </Menu.Item>
           <Menu.Item key="5">
               <Anchor.Link href="#comments" title="評価"></Anchor.Link>
           </Menu.Item>
          </Menu>
         </Anchor>
        {/*プロダクト差別点*/}
        <div id="feature" className={styles["product-detail-container"]}>
         <Divider orientation={'center'}>
             <Typography.Title level={3}>差別点</Typography.Title>
         </Divider>
          <div dangerouslySetInnerHTML={{__html: product.features}} style={{margin: 50}}></div>
        </div>
        {/*費用*/}
        <div id="fees" className={styles["product-detail-container"]}>
        <Divider orientation={'center'}>
             <Typography.Title level={3}>費用</Typography.Title>
         </Divider>
          <div dangerouslySetInnerHTML={{__html: product.fees}} style={{margin: 50}}></div>
        </div>
        {/*予約の事前お知らせ*/}
        <div id="notes" className={styles["product-detail-container"]}>
        <Divider orientation={'center'}>
             <Typography.Title level={3}>予約の事前お知らせ</Typography.Title>
         </Divider>
          <div dangerouslySetInnerHTML={{__html: product.notes}} style={{margin: 50}}></div>
        </div>
        {/* 評価*/}
        <div id="comments" className={styles["product-detail-container"]}>
        <Divider orientation={'center'}>
             <Typography.Title level={3}>評価</Typography.Title>
         </Divider>
         <div style={{margin: 40}}>
          <ProductComments data={commentMockData}/>
         </div>
        </div>
        </div>
      <Footer/>
    </>
}