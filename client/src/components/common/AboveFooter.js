import React from 'react'

function AboveFooter() {
  return (
    <div className="above-footer">
      <div className="top-row">
        <img src="./images/sprite-white-logo.svg" alt="Natoora" className="logo-footer"/>
        <div className="seven--columns navigation">
          <nav>
            <ul className="nav-stacked footer-nav">
              <li className="timezone-uk"><a href="inside-natoora/our-story.php">Our Story</a></li>
              <li className="timezone-usa"><a href="inside-natoora/our-mission.php">Our Mission</a></li>
              <li><a href="natoora-produce/our-produce.php">Our Produce</a></li>
              <li><a href="working-with-chefs.php">Working with Chefs</a></li>
              <li className="timezone-uk"><a href="how-to-buy/delivered/index.php">How to Buy</a></li>
              <li><a href="natoora-produce/our-growers.php">Our Growers</a></li>
              <li><a href="contact-us.php">Contact Us</a></li>
              <li className="timezone-uk"><a href="inside-natoora/memberships-accreditations.php">Membership &amp;
							Accreditations</a></li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="footer-form">
        <form>
          <h4>
          Get our seasonal updates straight to your inbox.
          </h4>
          <input placeholder="Email Address"></input>
          <label>
            Tell us one more thing
          </label>
          <ul>
            <li>
              <input type="radio" id="chef-or-no">
              </input>
              <label>I am a chef</label>
            </li>
            <li>
              <input type="radio" id="chef-or-no">
              </input>
              <label>I am not a chef</label>
            </li>
          </ul>
          <button type="submit" value="Sign Up" name="subscribe" id="mc-embedded-subscribe" className="block-form button is-fullwidth form-submit-button"></button>
        </form>
      </div>
      <div className="top-footer">
        <img src="./images/sprite-white-logo.svg" alt="Natoora" className="logo-footer"/>
      </div>
      <ul className="box-social">
        <li className="facebook"><a href="https://www.facebook.com/NatooraUK" target="_blank" rel="noreferrer">F</a></li>
        <li className="twitter"><a href="https://twitter.com/Natoora" target="_blank" rel="noreferrer">T</a></li>
        <li className="instagram"><a href="https://www.instagram.com/natoora/?hl=en" target="_blank" rel="noreferrer">I</a>
        </li>
      </ul>
    </div>
  )
}

export default AboveFooter