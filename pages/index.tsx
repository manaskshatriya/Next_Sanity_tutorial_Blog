import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Navbar from "../components/Navbar";
import m from "../assets/iconmonstr-medium-1.svg";
import {sanityClient , urlFor} from "../sanity"
import { Post } from "../typing";
import post from "../sanitynextblog/schemas/post";
import Link from "next/link";

interface Props {
  posts:[Post];

}

export default function Home({posts}:Props) {
  // console.log(urlFor(posts[0].mainImage))
  
  return (
    <div className="max-w-7xl mx-auto">
      <Head>
        <title>Medium Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <div className="flex justify-between items-center bg-yellow-400 border-y border-black py-10 ">
        <div className="px-10 space-y-5 ">
          <h1 className="text-6xl max-w-xl font-serif">
            <span className="underline decoration-black decoration-4">
              Medium
            </span>{" "}
            is a place to write read and connect
          </h1>
          <h2>
            Its easy and free to post your thinking on any topic and connect
            with millions of readers
          </h2>
        </div>

        <Image
          className="hidden md:inline-flex h-32  w-[20%] lg:h-52"
          src={m}
          width={1000}
          height={1000}
          alt={""}
        ></Image>
      </div>
      {/* Posts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6" >
        {posts.map(post =>(
          <Link key={post._id} href= {`/posts/${post.slug.current}`}>
            <div className="group border rounded-lg  cursor-pointer overflow-hidden " >
              
                <img className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out "  src={urlFor(post.mainImage).url()!} alt="" ></img>
            
              <div className="flex  justify-between p-2 bg-white" >
                <div>
                  <p className="text-lg font-bold" >{post.title}</p>
                  <p className="text-sm"  >{post.description} by {post.author.name}</p>
                </div>
                <img className="h-12 w-12 rounded-full" src={urlFor(post.author.image).url()} alt=""></img>
              </div>
               
            </div>
           </Link>
        ))}
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const query = `*[_type == "post"]{
    _id,
    title,
      author->{
        name,
        image
      },
      description,
      mainImage,
      slug
  }`;
  
    


  const posts = await sanityClient.fetch(query);
  return{
    props:{
      posts
    }
  }
};



