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
        <section className="m-auto max-w-5xl">
          <article className="pb-8 text-2xl font-bold text-headline">
            <h1 className="pb-12">Amoureux du vinyle ?</h1>
            <p>
              Échange, collectionne, trie, fais le ménage ! Trouve dans ta ville
              ou ton quartier les 33 tours qui manquent à ta collection.
            </p>
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
      <div className="bg-buttonText py-16 text-paragraph">
        <section className="m-auto max-w-5xl">
          <figure className="flex flex-col justify-start gap-16 md:flex-row md:justify-center">
            <div className="relative h-auto w-full max-w-full flex-none px-4 leading-none md:max-w-sm md:px-0">
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
                <em className="block border-l-4 border-red-600 pl-2 text-2xl not-italic">
                  Je lâche
                </em>
                <span className="block pt-8 ">
                  Fais ici la liste des vinyles dont tu es prêt à te
                  débarrasser.
                </span>
              </p>

              <p>
                <em className="block border-l-4 border-green-500 pl-2 text-2xl not-italic">
                  Je cherche
                </em>
                <span className="block pt-8 ">
                  Liste ici les vinyles que tu recherches (nom artiste ou titre
                  album)
                </span>
              </p>

              <p>
                <em className="block border-l-4 border-yellow-400 pl-2 text-2xl not-italic">
                  Comment ça marche ?
                </em>
                <span className="block pt-8">
                  Vinylmania est une plateforme d&apos;échange de disques sans
                  but commercial. Le service de mise en relation est libre et
                  gratuit.
                </span>
                <span>Concrètement comment ça marche ?</span>
              </p>
            </article>
          </figure>
          <article className="m-auto pt-16">
            <p>
              <em className="block max-w-fit border-b-4 border-sky-400 text-2xl not-italic">
                Deux possibilités
              </em>
            </p>
            <ul>
              <li>
                <p>
                  <em className="flex flex-row items-center py-8 text-xl font-thin not-italic">
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
                  <em className="flex flex-row items-center py-8 text-xl font-thin not-italic">
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
