import type {NextPage} from 'next/types'
import Image from 'next/image'
import HomeButton from '../components/Layout/HomeButton'
import {ArrowRight} from 'react-feather'
export async function getStaticProps() {
  const imageUrl = `https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2073&q=80`
  const secondImage =
    'https://images.unsplash.com/photo-1526394931762-90052e97b376?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80'
  return {
    props: {imageUrl, secondImage},
  }
}
const Home: NextPage<{imageUrl: string; secondImage: string}> = ({
  imageUrl,
  secondImage,
}) => {
  return (
    <main className="flex flex-col justify-center">
      <div className="bg-background pt-16 pb-16">
        <section className="max-w-4xl m-auto">
          <article className="text-2xl font-bold text-headline pb-8">
            Échange, collectionne, trie, fais le ménage ! Tu es un amoureux du
            vinyle ? Trouve dans ta ville ou ton quartier les 33 tours qui
            manquent à ta collection.
          </article>

          <figure className="relative">
            <Image
              alt="Bibliothèque vinyle | Source : Unsplash"
              src={imageUrl}
              layout="intrinsic"
              width={1500}
              height={1000}
              placeholder="blur"
              blurDataURL={imageUrl}
              priority
            />
            <HomeButton />
          </figure>
        </section>
      </div>
      <div className="bg-buttonText py-16">
        <section className="max-w-4xl m-auto">
          <figure className="flex flex-col md:justify-center md:flex-row justify-start gap-16">
            <div className="leading-none relative flex-none md:max-w-sm max-w-full w-full h-auto px-4 md:px-0">
              <Image
                alt="platine à vinyles | Source : Unsplash by Kevin McCutcheon"
                src={secondImage}
                layout="responsive"
                width={1920 / 2}
                height={2880 / 2}
                quality={50}
                placeholder="blur"
                blurDataURL={secondImage}
              />
            </div>

            <article className="flex flex-col justify-between px-4 md:px-0">
              <p>
                <em className="block not-italic border-l-4 border-red-600 pl-2 text-2xl">
                  Je lâche
                </em>
                <span className="pt-8 block ">
                  Fais ici la liste des vinyles dont tu es prêt à te
                  débarrasser.
                </span>
              </p>

              <p>
                <em className="block not-italic border-l-4 border-green-500 pl-2 text-2xl">
                  Je cherche
                </em>
                <span className="pt-8 block ">
                  Liste ici les vinyles que tu recherches (nom artiste ou titre
                  album)
                </span>
              </p>

              <p>
                <em className="block not-italic border-l-4 border-yellow-400 pl-2 text-2xl">
                  Comment ça marche ?
                </em>
                <span className="pt-8 block ">
                  Vinylmania est une plateforme d&apos;échange de disques sans
                  but commercial. Le service de mise en relation est libre et
                  gratuit. Concrètement comment ça marche ?
                </span>
              </p>
            </article>
          </figure>
          <article className="m-auto pt-16">
            <p>
              <em className="block not-italic border-b-4 border-sky-400 text-2xl max-w-fit">
                Deux possibilités
              </em>
            </p>
            <ul>
              <li>
                <p>
                  <em className="flex flex-row items-center not-italic text-xl font-thin py-8">
                    <ArrowRight size={30} strokeWidth={2} />
                    <span className="pl-4 first-letter:capitalize">
                      échange
                    </span>
                    &nbsp;croisé
                  </em>
                  Jim trouve chez Jason un disque qui l&apos;intéresse et Jason
                  voit chez Jim le disque qu&apos;il recherche. Jim et Jason se
                  contactent via la messagerie puis se rencontrent dans la vraie
                  vie. Vinylemania n&apos;intervient pas. Vinylemania dégage
                  toute responsabilité sur les conditions de l&apos;échange.
                </p>
              </li>

              <li>
                <p>
                  <em className="flex flex-row items-center not-italic text-xl font-thin py-8">
                    <ArrowRight size={30} strokeWidth={2} />
                    <span className="pl-4 first-letter:capitalize">
                      échange
                    </span>
                    &nbsp; à sens unique
                  </em>
                  Jim trouve chez Janis un disque qui l&apos;intéresse, mais
                  Janis n&apos;aime aucun des disques proposés par Jim. La
                  rencontre peut se faire via la messagerie. Le disque est
                  acheté au prix forfaitaire de 5 € (prix conseil Vinylemania).
                  La transaction se fait dans la vraie vie, en dehors de la
                  plateforme, sous la seule responsabilité de l&apos;acheteur et
                  du vendeur.
                </p>
              </li>
            </ul>
          </article>
        </section>
      </div>
    </main>
  )
}

export default Home
