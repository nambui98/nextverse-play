import { GetStaticPaths, GetStaticProps } from 'next';
import { InventoryLayOut } from '../../../components/iventoryLayout';
import { Layout } from '../../../components/layout';

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
      { params: { category: 'cat' } },
      { params: { category: 'dog' } }
    ],
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const data: {[key: string]: any} = {
    cat: {
      category: 'Pet_cat',
      title: 'Cats',
    },
    dog: {
      category: 'Pet_dog',
      title: 'Dogs',
    },
  }
  
  return {
    props: {
      ...data[`${params?.category}`],
    }
  }
}
