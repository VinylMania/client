import React from 'react'
import {Link} from 'react-router-dom'
import {useAppSelector} from '../../hooks'

const Homepage: React.FC = () => {
  const users = useAppSelector(state => state.root.authReducer)

  const url = 'https://images.unsplash.com/photo-1582730147924-d92f4da00252'

  const url2 = 'https://images.unsplash.com/photo-1526394931762-90052e97b376'

  const url3 = 'https://images.unsplash.com/photo-1483412033650-1015ddeb83d1'
  const {isAuthenticated} = users

  return (
    <div id="home-wrapper" className="bg-black pt-16 text-white">
      <section className="max-w-4xl mx-auto p-8 border-8 border-green-400">
        <figure className="relative">
          <img src={url3} alt="bibliothèque de vinyles" />
          <Link to="/library" className="home-library">
            <p className="m-auto font-semibold text-3xl shadow-2xl">
              Consulter la bibliothèque
            </p>
          </Link>
        </figure>
      </section>
      <section className="flex flex-row px-8 py-16 max-w-6xl items-start m-auto">
        <p className="px-4 text-3xl text-white border-l-2 border-red-500">
          Lollipop pudding gingerbread tiramisu lollipop. Cotton candy chocolate
          candy chocolate cake. Gummies bear claw macaroon chocolate cake apple
          pie bear claw gingerbread. Caramels soufflé pastry biscuit candy
          canes. Fruitcake bonbon sweet roll marzipan carrot cake sweet roll.
          chocolate cake marzipan.
        </p>
        <img src={url} alt="homepage" className="max-w-lg px-4" />
      </section>

      <section className="flex flex-row px-8 py-16 max-w-6xl items-start m-auto">
        <img src={url2} alt="homepage" className="max-w-lg px-4" />
        <p className="px-4 text-3xl text-white border-l-2 border-indigo-600">
          Lollipop pudding gingerbread tiramisu lollipop. Cotton candy chocolate
          candy chocolate cake. Gummies bear claw macaroon chocolate cake apple
          pie bear claw gingerbread. Caramels soufflé pastry biscuit candy
          canes. Fruitcake bonbon sweet roll marzipan carrot cake sweet roll.
          chocolate cake marzipan.
          <span className="block pt-8 italic text-fuschia-400">
            Bonbon topping sesame snaps toffee pudding dessert cotton candy
            muffin. Cake cotton candy pastry croissant cookie liquorice. Jelly-o
            powder candy canes chupa chups halvah cotton candy dragée tiramisu.
            Chocolate bar pie tootsie roll pie cotton candy sugar plum sweet
            danish marzipan. Apple pie donut soufflé chocolate jelly halvah
            tiramisu dessert apple pie.
          </span>
        </p>
      </section>
    </div>
  )
}

export default Homepage
