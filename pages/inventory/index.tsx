import type { NextPage } from 'next';
import { Layout } from 'components/layout'
import { InventoryLayOut } from '../../components/iventoryLayout';


const Page: NextPage = () => {
	return <Layout>
    <InventoryLayOut title={"Inventory"}/>
	</Layout>
}


export default Page;