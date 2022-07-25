import { useNavigate, useLocation } from "react-router-dom";
import { ReactComponent as OfferIcon } from "../assets/svg/localOfferIcon.svg";
import { ReactComponent as ExploreIcon } from "../assets/svg/exploreIcon.svg";
import { ReactComponent as PersonOutlineIcon } from "../assets/svg/personOutlineIcon.svg";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const pathMatch = (path) => {
    if (location.pathname === path) {
      return true;
    }
  };
  return (
    <footer className='navbar'>
      <nav className='navbarNav'>
        <ul className='navbarListItems'>
          <li className='navbarListItem'>
            <ExploreIcon
              fill={pathMatch("/") ? "#2c2c2c" : "#8f8f8f"}
              onClick={() => navigate("/")}
              width='36px'
              height='36px'
            />
            <p
              className={
                pathMatch("/")
                  ? "navbarListItemNameActive"
                  : "navbarListItemName"
              }
            >
              Explore
            </p>
          </li>
          <li className='navbarListItem'>
            <OfferIcon
              fill={pathMatch("/offers") ? "#2c2c2c" : "#8f8f8f"}
              onClick={() => navigate("/offers")}
              width='36px'
              height='36px'
            />
            <p
              className={
                pathMatch("/offers")
                  ? "navbarListItemNameActive"
                  : "navbarListItemName"
              }
            >
              Offers
            </p>
          </li>
          <li className='navbarListItem'>
            <PersonOutlineIcon
              fill={pathMatch("/profile") ? "#2c2c2c" : "#8f8f8f"}
              onClick={() => navigate("/profile")}
              width='36px'
              height='36px'
            />
            <p
              className={
                pathMatch("/profile")
                  ? "navbarListItemNameActive"
                  : "navbarListItemName"
              }
            >
              Profile
            </p>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Navbar;
