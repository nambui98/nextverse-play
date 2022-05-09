import { Layout } from '../../components/layout';
import { GetStaticPaths, GetStaticProps } from 'next';
import { InventoryLayOut } from '../../components/iventoryLayout';

export default function InventoryCategory({ category, title }: any) {
  return( 
    <Layout>
      <InventoryLayOut category={category} title={title} />
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { category: 'equipment' } },
      { params: { category: 'avatar' } }
    ],
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const data: {[key: string]: any} = {
    equipment: {
      category: 'Equipment',
      title: 'Equipment',
    },
    avatar: {
      category: 'Avatar',
      title: 'Avatar',
    },
  }
  
  return {
    props: {
      ...data[`${params?.category}`],
    }
  }
}
