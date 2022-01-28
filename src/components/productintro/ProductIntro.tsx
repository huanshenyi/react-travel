import styles from "./ProductIntro.module.css";
import { Typography, Carousel, Image, Rate , Table} from "antd";
import { ColumnsType } from "antd/es/table";

interface PropsType {
    title: string,
    shortDescription: string,
    price: string | number,
    coupons: string,
    points: string,
    discount: string,
    rating: string | number,
    pictures: string[],
}

const columns: ColumnsType<RowType> = [
  {
      title: "title",
      dataIndex: "title",
      key: "title",
      align: "left",
      width: 120
  },
  {
      title: "description",
      dataIndex: "description",
      key: "description",
      align: "center",
  }
]

interface RowType {
    title: string,
    description: string | number |JSX.Element,
    key: number,
}

export const ProductIntro: React.FC<PropsType> = ({
    title,
    shortDescription,
    price,
    coupons,
    points,
    discount,
    rating,
    pictures
}) => {
    const tableDateSource: RowType[] = [
      {
          key: 0,
          title: "路線名",
          description: title,
      },
      {
          key: 1,
          title: "値段",
          description: (
              <>
                ${" "}
                <Typography.Text type="danger" strong>
                    {price}
                </Typography.Text>
              </>
          )
      },
      {
          key: 2,
          title: "割引",
          description: discount ? (
              <>
                $ <Typography.Text delete>{price}</Typography.Text>{" "}
                <Typography.Text type="danger" strong>
                  $ {discount}
                </Typography.Text>
              </>
          ): (
              "割引なし"
          )
      },
      {
          key: 2,
          title: "割引取得",
          description: coupons ? discount: "なし"
      },
      {
          key:2,
          title: "評価",
          description: (
              <>
              <Rate allowHalf defaultValue={+rating}/>
              <Typography.Text style={{marginLeft: 10}}>
                {rating} 星
              </Typography.Text>
              </>
          )
      }
    ]
   return <div className={styles['intro-container']}
   >
            <Typography.Title level={4}>{title}</Typography.Title>
            <Typography.Text>{shortDescription}</Typography.Text>
            <div className={styles['intro-detail-content']}>
               <Typography.Text style={{marginLeft:20}}>
                   $<span className={styles['intro-detail-strong-text']}>{price}</span>
               </Typography.Text>
               <Typography.Text style={{marginLeft:50}}>
                   $<span className={styles['intro-detail-strong-text']}>{rating}</span>
               </Typography.Text>              
            </div>
            <Carousel autoplay slidesToShow={3}>
             {
                 pictures.map( p => {
                     <Image height={150} src={p}/>
                 })
             }
            </Carousel>
        <Table columns={columns} dataSource={tableDateSource} size="small" bordered={false} pagination={false}></Table>
   </div>
}