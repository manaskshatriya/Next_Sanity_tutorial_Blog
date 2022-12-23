import { GetStaticProps } from "next"
import Navbar from "../../components/Navbar"
import { sanityClient , urlFor } from "../../sanity"

import post from "../../sanitynextblog/schemas/post"
import { Post } from "../../typing"


interface Props {
    post: Post;
}
  

function Post({post}:Props) {
    console.log(post)
  return (
    <div>
        <Navbar></Navbar>
    </div>
  )
}

export default Post
export const getStaticPaths  = async () => {
    const query = `*[_type == "post"]{
          _id,
          slug{
            current
          }
      }`;
  
    const posts = await sanityClient.fetch(query);
    console.log(posts)
    const paths = posts.map((post: Post) => ({
      params: {
        id:post.slug.current,
      },
    }));
  
    return {
      paths,
      // fallback: 'blocking',
    };
  };
  
  export const getStaticProps: GetStaticProps = async ( {params} ) => {
    const query = `*[_type == "post" && slug.current == $slug][0]{
          _id,
          _createdAt,
          title,
          author-> {
              name,
              image
          },
          'comments' : *[_type == "comment" &&
            post._ref == ^._id &&
            approved== true],
          description,
          mainImage,
          slug,
          body
      }`;
    const post = await sanityClient.fetch(query, {
      slug: params?.slug,
    });
    key: query
    // if (!post) {
    //   return {
    //     notFound: true,
    //   }
    // }
    return {
      props: {
        post,
      }
    
    }
  }