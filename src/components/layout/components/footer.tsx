//@ts-nocheck
import { FC } from "react";
import FacebookIcon from "../../../source/Vectorfacebook.svg";
import TwitterIcon from "../../../source/Vectortwitter.svg";
import YoutubeIcon from "../../../source/Vectoryoutube.svg";
import InstagramIcon from "../../../source/Vectorinstagram.svg";

export const Footer: FC = () => {
  return (
    <footer>
      <div className="reference_information">
        <span>Privacy Policy</span>
        <span>Terms & Conditions</span>
        <span>Cookie Policy</span>
      </div>

      <div className="social_network">
        <img src={FacebookIcon} alt="" />
        <img src={TwitterIcon} alt="" />
        <img src={YoutubeIcon} alt="" />
        <img src={InstagramIcon} alt="" />
      </div>

      <div className="rights_information">
        ©2022 All rights reserved. Powered by Atla
      </div>
    </footer>
  );
};
