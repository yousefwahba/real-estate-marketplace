import { Link } from "react-router-dom";
import Slider from "../components/Slider";
import rentCategoryImage from "../assets/jpg/rentCategoryImage.jpg";
import sellCategoryImage from "../assets/jpg/sellCategoryImage.jpg";
const Explore = () => {
  return (
    <div className='explore'>
      <header>
        <p className='pageHeader'>Explore</p>
      </header>
      <main>
        {/* slider  */}
        <Slider />
        <p className='exploreCategoryHeading mb-2'>Categories</p>
        <div className='exploreCategories'>
          <Link to='/category/rent'>
            <img
              src={rentCategoryImage}
              alt='rent category image'
              className='exploreCategoryImg '
            />
            <p className='exploreCategoryName mt-2'>Places for rent</p>
          </Link>
          <Link to='/category/sale'>
            <img
              src={sellCategoryImage}
              alt='sell category image'
              className='exploreCategoryImg '
            />
            <p className='exploreCategoryName mt-2'>Places for sale</p>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Explore;
