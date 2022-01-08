import type {NextPage} from 'next/types'
import Image from 'next/image'
import Link from 'next/link'
import {trpc} from '../utils/trpc'
const Home: NextPage = () => {
  const {data, isLoading} = trpc.useQuery([
    'hello',
    {text: 'TESTTSTTSITISTISTIST'},
  ])
  return (
    <>
      {isLoading && <p>Loading...</p>}
      {data && <p>{data.greeting}</p>}
    </>
    // <main className="bg-black p-16 text-white">
    //   <section className="max-w-5xl mx-auto px-8 border-x border-white">
    //     <article className="text-2xl pb-8">
    //       Échange, collectionne, trie, fais le ménage ! Tu es un amoureux du
    //       vinyle ? Trouve dans ta ville ou ton quartier les 33 tours qui
    //       manquent à ta collection.
    //     </article>
    //     <figure className="relative">
    //       <Image
    //         alt="Bibliothèque vinyle"
    //         src="/vinylunsplash2.jpg"
    //         layout="intrinsic"
    //         width={1500}
    //         height={1000}
    //         placeholder="blur"
    //         blurDataURL="/vinylunsplash2.jpg"
    //         priority
    //       />
    //       <Link href="/library">
    //         <a className="home-library">
    //           <span className="m-auto font-semibold text-3xl drop-shadow-2xl p-4 rounded-full bg-black bg-opacity-50 transition duration-300 border-2 border-slate-500">
    //             Consulter la bibliothèque
    //           </span>
    //         </a>
    //       </Link>
    //     </figure>

    //     <figure className="pt-8 grid grid-cols-2">
    //       <div className="w-4/5">
    //         <Image
    //           alt="platine à vinyles"
    //           src="/vinylunsplash3.jpg"
    //           layout="intrinsic"
    //           quality={50}
    //           width={1000}
    //           height={2000}
    //           placeholder="blur"
    //           blurDataURL="/vinylunsplash3.jpg"
    //         />
    //       </div>
    //       <article className="flex flex-col justify-evenly">
    //         <p className="py-4">
    //           <em className="block not-italic border-l-4 border-red-600 pl-2 text-2xl">
    //             Je lâche
    //           </em>
    //           Fais ici la liste des vinyles dont tu es prêt à te débarrasser.
    //         </p>

    //         <p className="py-4">
    //           <em className="block not-italic border-l-4 border-green-500 pl-2 text-2xl">
    //             Je cherche
    //           </em>
    //           Liste ici les vinyles que tu recherches (nom artiste ou titre
    //           album)
    //         </p>

    //         <p className="py-4">
    //           <em className="block not-italic border-l-4 border-yellow-400 pl-2 text-2xl">
    //             Comment ça marche ?
    //           </em>
    //           Vinylmania est une plateforme d&apos;échange de disques sans but
    //           commercial. Le service de mise en relation est libre et gratuit.
    //           Concrètement comment ça marche ?
    //         </p>
    //       </article>
    //     </figure>
    //     <article className="m-auto">
    //       <p className="py-4">
    //         <em className="block not-italic border-b-4 border-sky-400 text-2xl max-w-fit">
    //           Deux possibilités
    //         </em>
    //       </p>
    //       <ul>
    //         <li>
    //           <p className="py-4">
    //             <em className="block w-max not-italic text-lg">
    //               <span className="capitalize">échange</span> croisé
    //             </em>
    //             Jim trouve chez Jason un disque qui l&apos;intéresse et Jason
    //             voit chez Jim le disque qu&apos;il recherche. Jim et Jason se
    //             contactent via la messagerie puis se rencontrent dans la vraie
    //             vie. Vinylemania n&apos;intervient pas. Vinylemania dégage toute
    //             responsabilité sur les conditions de l&apos;échange.
    //           </p>
    //         </li>

    //         <li>
    //           <p className="py-4">
    //             <em className="block not-italic text-lg">
    //               <span className="capitalize">échange</span> à sens unique
    //             </em>
    //             Jim trouve chez Janis un disque qui l&apos;intéresse, mais Janis
    //             n&apos;aime aucun des disques proposés par Jim. La rencontre
    //             peut se faire via la messagerie. Le disque est acheté au prix
    //             forfaitaire de 5 € (prix conseil Vinylemania). La transaction se
    //             fait dans la vraie vie, en dehors de la plateforme, sous la
    //             seule responsabilité de l&apos;acheteur et du vendeur.
    //           </p>
    //         </li>
    //       </ul>
    //     </article>
    //   </section>
    // </main>
  )
}

export default Home
