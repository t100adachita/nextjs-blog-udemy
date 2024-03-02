import Layout from "../components/Layout";
import Head from 'next/head'
import { getAllPostIds, getPostData } from "../../lib/post";
import utilStyles from "../../styles/utils.module.css";

export async function getStaticPaths() {
    const paths = getAllPostIds();

    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({params}) {
    const postData = await getPostData(params.id);

    return {
        props: {
            postData,
        },
    };
}

export default function Post({postData}) {
    return (
        // <Layout>動的ルーティング設定</Layout>
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
        <article>
            <h1 className={utilStyles.headingX1}>
            {postData.title}</h1>
            <div className={utilStyles.lightText}>
            {postData.date}
            </div>
        <br />
        <br />
        <div dangerouslySetInnerHTML={{__html: postData.blogContentHTML }}/>
        <br />
        </article>
        </Layout>
    );
}