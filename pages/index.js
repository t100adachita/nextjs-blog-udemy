import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from "next/link"
import Layout, {siteTitle} from './components/Layout'
import utilStyle from "../styles/utils.module.css";
// import { getPostsData } from '@/lib/post'
import { getPostsData } from "../lib/post";

// const inter = Inter({ subsets: ['latin'] })

//SSGの場合
export async function getStaticProps() {
  const allPostsData = getPostsData(); //id, title, date, thumbnail
  console.log(allPostsData);

  return {
    props: {
      allPostsData,
    },
  };
}

//SSRの場合
// export async function getServerSideProps(context){
  
//   return {
//     props:{
//       //コンポーネントに渡すためのprops
//     }
//   }
// }

export default function Home( {allPostsData} ) {
  return ( 
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      {/* <a href="test">NextJsです</a>
       */}
      <section className={utilStyle.headingMd}>
        <p>
          私はフルスタックエンジニアです。フリーランスエンジニアとして活躍しています。好きな言語はPythonです。
        </p>
      </section>
      <section>
        <h2>
          📝エンジニアのブログ
        </h2>
        <div className={styles.grid}>
          {allPostsData.map(({id, title, date, thumbnail}) => (
            <article key={id}>
              <Link href={`/posts/${id}`}>
                <img src={`${thumbnail}`}
                  className={styles.thumbnailImage}
                />
              </Link>
              <Link href={`/posts/${id}`} legacyBehavior>
                <a className={utilStyle.boldText}>{title}</a>
              </Link>
              <br />
              <small className={utilStyle.lightText}>
                {date}
              </small>
            </article>
          ))}
        </div>

      </section>


    </Layout>
  );
}
