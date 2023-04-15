import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ImageIndex } from '@src/assets/AssetIndex';
import { motion } from 'framer-motion';
import DefaultButton from '@src/Components/common/buttons/DefaultButton/DefaultButton';

function BannerCell(name: string, width: number) {
  return (
    <p style={{ width, color: 'var(--light)' }} className="pretitle">
      {name}
    </p>
  );
}

export const columnConfig: ColumnConfig<Companies.CompanyListRow>[] = [
  {
    name: 'SR NO',
    index: 0,
    width: 120,
    isWidthFixed: true,
    growthOrder: 1,
    component: (data, width) => (
      <div style={{ width }}>
        <p className="small fcolor-text-body fw-medium">{data.srNo}</p>
      </div>
    ),
    bannerComponent: BannerCell,
  },
  {
    name: 'company name',
    index: 1,
    width: 200,
    growthOrder: 1,
    component: (data, width) => {
      const navigate = useNavigate();
      console.log('data received', data);
      return (
        <div style={{ width }} className="vc cursor-pointer" onClick={() => navigate(`/company/${data._id}`)}>
          <div
            style={{
              height: 32,
              width: 32,
              borderRadius: 200,
              overflow: 'hidden',
              objectFit: 'cover',
              objectPosition: 'center center',
            }}
          >
            <img
              src={data.companyName.imageURL === '' ? ImageIndex.CategoryImage : data.companyName.imageURL}
              style={{ height: '100%', width: '100%' }}
            />
          </div>
          <p className="small fcolor-text-body fw-medium ml-2">{data.companyName.name}</p>
        </div>
      );
    },
    bannerComponent: BannerCell,
  },
  {
    name: 'price',
    index: 2,
    width: 120,
    growthOrder: 1,
    component: (data, width) => (
      <p className="small fcolor-text-body fw-medium" style={{ width }}>
        {data.price}
      </p>
    ),
    bannerComponent: BannerCell,
  },
  {
    name: 'entry time',
    index: 3,
    width: 220,
    growthOrder: 1,
    component: (data, width) => (
      <p className="small fcolor-text-body fw-medium" style={{ width }}>
        {data.entryTime}
      </p>
    ),
    bannerComponent: BannerCell,
  },
  {
    name: 'no of products',
    index: 4,
    width: 150,
    growthOrder: 1,
    component: (data, width) => {
      const navigate = useNavigate();
      return (
        <div style={{ width }}>
          <motion.p
            style={{ border: '1px solid rgba(0,0,0,0)', width: width * 0.8, paddingLeft: 8 }}
            whileHover={{ borderColor: 'var(--iris)', scale: 1.1 }}
            className="small fcolor-iris fw-medium cursor-pointer"
            onClick={() => {
              navigate(`/products/${data._id}`);
            }}
          >
            {data.noOfProducts}
          </motion.p>
        </div>
      );
    },
    bannerComponent: BannerCell,
  },
  {
    name: 'view products',
    index: 5,
    width: 100,
    growthOrder: 1,
    component: (data, width) => {
      const navigate = useNavigate();
      return (
        <div style={{ width }}>
          <DefaultButton
            onClick={function (): void {
              navigate(`/company/productList/${data._id}`);
            }}
            label={'view products'}
            defaultStyles={{ container: { padding: 8 }, text: { fontSize: 10 } }}
          />
        </div>
      );
    },
    bannerComponent: BannerCell,
  },
];
