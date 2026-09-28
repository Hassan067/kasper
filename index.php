<?php
declare(strict_types=1);

$pageTitle = 'Kasper | Template Two';

require __DIR__ . '/includes/header.php';
?>
    <!-- Start Landing -->
    <section class="landing" id="home">
      <div class="overlay"></div>
      <div class="text">
        <!-- Each .content is one slide; data-bg is the background image for that slide -->
        <div class="content active" data-bg="images/landing.jpg">
          <h2>
            Hello World!<br />
            We Are Kasper We Make Art.
          </h2>
          <p>
            Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Mauris blandit aliquet elit, eget tincidunt
            nibh pulvinar a. Curabitur aliquet quam. Accumsan id imperdiet et, porttitor at sem. Mauris blandit aliquet
            elit, eget tincidunt.
          </p>
        </div>
        <div class="content" data-bg="images/landing-02.jpg">
          <h2>
            Creative Ideas<br />
            Built With Clean Code.
          </h2>
          <p>
            From the first sketch to the final line of code, we turn ideas into fast, responsive websites that look
            great on every screen and are easy to grow over time.
          </p>
        </div>
        <div class="content" data-bg="images/landing-03.jpg">
          <h2>
            Your Vision,<br />
            Our Pixel-Perfect Design.
          </h2>
          <p>
            We listen first, then design and build together with you, so the final result feels like your brand and
            works the way your visitors expect.
          </p>
        </div>
      </div>
      <button class="change-background prev" type="button" aria-label="Previous slide">
        <i class="fas fa-angle-left fa-2x" aria-hidden="true"></i>
      </button>
      <button class="change-background next" type="button" aria-label="Next slide">
        <i class="fas fa-angle-right fa-2x" aria-hidden="true"></i>
      </button>
      <div class="bullets">
        <button class="active" type="button" aria-label="Go to slide 1"></button>
        <button type="button" aria-label="Go to slide 2"></button>
        <button type="button" aria-label="Go to slide 3"></button>
      </div>
    </section>
    <!-- End Landing -->
    <!-- Start Services -->
    <section class="services" id="services">
      <div class="container">
        <div class="main-heading">
          <h2>Services</h2>
          <p>
            Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Mauris blandit aliquet elit, eget
            tincidunt.
          </p>
        </div>
        <div class="services-container">
          <div class="srv-box">
            <i class="fas fa-desktop fa-3x"></i>
            <div class="text">
              <h3>Vorem amet intuitive</h3>
              <p>
                Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Mauris blandit aliquet elit, eget
                tincidunt nibh pulvinar a. Curabitur aliquet quam.
              </p>
            </div>
          </div>
          <div class="srv-box">
            <i class="fas fa-cog fa-3x"></i>
            <div class="text">
              <h3>Vorem amet intuitive</h3>
              <p>
                Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Mauris blandit aliquet elit, eget
                tincidunt nibh pulvinar a. Curabitur aliquet quam.
              </p>
            </div>
          </div>
          <div class="srv-box">
            <i class="fas fa-pencil-ruler fa-3x"></i>
            <div class="text">
              <h3>Vorem amet intuitive</h3>
              <p>
                Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Mauris blandit aliquet elit, eget
                tincidunt nibh pulvinar a. Curabitur aliquet quam.
              </p>
            </div>
          </div>
          <div class="srv-box">
            <i class="fas fa-camera fa-3x"></i>
            <div class="text">
              <h3>Vorem amet intuitive</h3>
              <p>
                Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Mauris blandit aliquet elit, eget
                tincidunt nibh pulvinar a. Curabitur aliquet quam.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- End Services -->
    <!-- Start Design -->
    <section class="design">
      <div class="image">
        <img src="images/mobile.png" alt="Kasper design shown on a mobile phone" />
      </div>
      <div class="text">
        <h2>Our Design Comes With...</h2>
        <ul>
          <li>Responsive Design</li>
          <li>Modern And Clean Design</li>
          <li>Clean Code</li>
          <li>Browser Friendly</li>
        </ul>
      </div>
    </section>
    <!-- End Design -->
    <!-- Start Portfolio -->
    <section class="portfolio" id="portfolio">
      <div class="container">
        <div class="main-heading">
          <h2>Portfolio</h2>
          <p>
            Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Mauris blandit aliquet elit, eget
            tincidunt.
          </p>
        </div>
        <ul class="shuffle">
          <li><button class="active" type="button" data-filter="all">All</button></li>
          <li><button type="button" data-filter="app">App</button></li>
          <li><button type="button" data-filter="photo">Photo</button></li>
          <li><button type="button" data-filter="web">Web</button></li>
          <li><button type="button" data-filter="print">Print</button></li>
        </ul>
      </div>
      <div class="imgs-container">
        <div class="box" data-category="app">
          <img src="images/shuffle-01.jpg" alt="App design project" />
          <div class="caption">
            <h4>Awesome Image</h4>
            <p>App Design</p>
          </div>
        </div>
        <div class="box" data-category="photo">
          <img src="images/shuffle-02.jpg" alt="Photography project" />
          <div class="caption">
            <h4>Awesome Image</h4>
            <p>Photography</p>
          </div>
        </div>
        <div class="box" data-category="web">
          <img src="images/shuffle-03.jpg" alt="Web design project" />
          <div class="caption">
            <h4>Awesome Image</h4>
            <p>Web Design</p>
          </div>
        </div>
        <div class="box" data-category="print">
          <img src="images/shuffle-04.jpg" alt="Print design project" />
          <div class="caption">
            <h4>Awesome Image</h4>
            <p>Print Design</p>
          </div>
        </div>
        <div class="box" data-category="app">
          <img src="images/shuffle-05.jpg" alt="App design project" />
          <div class="caption">
            <h4>Awesome Image</h4>
            <p>App Design</p>
          </div>
        </div>
        <div class="box" data-category="photo">
          <img src="images/shuffle-06.jpg" alt="Photography project" />
          <div class="caption">
            <h4>Awesome Image</h4>
            <p>Photography</p>
          </div>
        </div>
        <div class="box" data-category="web">
          <img src="images/shuffle-07.jpg" alt="Web design project" />
          <div class="caption">
            <h4>Awesome Image</h4>
            <p>Web Design</p>
          </div>
        </div>
        <div class="box" data-category="print">
          <img src="images/shuffle-08.jpg" alt="Print design project" />
          <div class="caption">
            <h4>Awesome Image</h4>
            <p>Print Design</p>
          </div>
        </div>
      </div>
      <a href="#" class="more">More</a>
    </section>
    <!-- End Portfolio -->
    <!-- Start Video -->
    <section class="video">
      <video autoplay muted loop>
        <source src="images/awesome-video.mp4" type="video/mp4" />
      </video>
      <div class="text">
        <h2>Super Awesome Video Here</h2>
        <p>Its All You Need</p>
        <button>See More</button>
      </div>
    </section>
    <!-- End Video -->
    <!-- Start About -->
    <section class="about" id="about">
      <div class="container">
        <div class="main-heading">
          <h2>About Us</h2>
          <p>
            Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Mauris blandit aliquet elit, eget
            tincidunt.
          </p>
        </div>
        <img src="images/about.png" alt="Kasper designs on desktop, laptop and tablet screens" />
      </div>
    </section>
    <!-- End About -->
    <!-- Start Stats -->
    <section class="stats">
      <div class="container">
        <div class="box">
          <i class="fas fa-mug-hot"></i>
          <div class="number">1,236</div>
          <p>Coffee Drinks</p>
        </div>
        <div class="box">
          <i class="far fa-folder"></i>
          <div class="number">256</div>
          <p>Completed Projects</p>
        </div>
        <div class="box">
          <i class="far fa-envelope"></i>
          <div class="number">1,743</div>
          <p>Mail Sent</p>
        </div>
        <div class="box">
          <i class="fas fa-trophy"></i>
          <div class="number">17</div>
          <p>Awards Received</p>
        </div>
      </div>
    </section>
    <!-- End Stats -->
    <!-- Start Skills -->
    <section class="our-skills">
      <div class="container">
        <div class="testimonials">
          <h3>Testimonials</h3>
          <p>
            Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Mauris blandit aliquet elit, eget
            tincidunt.
          </p>
          <div class="content">
            <img src="images/skills-01.jpg" alt="John Doe" />
            <div class="text">
              Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Mauris blandit aliquet elit, eget
              tincidunt.
              <p>John Doe, CEO</p>
            </div>
          </div>
          <div class="content">
            <img src="images/skills-02.jpg" alt="John Doe" />
            <div class="text">
              Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Mauris blandit aliquet elit, eget
              tincidunt.
              <p>John Doe, CEO</p>
            </div>
          </div>
          <ul class="bullets">
            <li></li>
            <li class="active"></li>
            <li></li>
          </ul>
        </div>
        <div class="skills">
          <h3>Skills</h3>
          <p>
            Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Mauris blandit aliquet elit, eget
            tincidunt.
          </p>
          <div class="prog-holder">
            <h4>Adobe</h4>
            <div class="prog">
              <span style="width: 90%" data-progress="90%"></span>
            </div>
          </div>
          <div class="prog-holder">
            <h4>Html &amp; Css</h4>
            <div class="prog">
              <span style="width: 85%" data-progress="85%"></span>
            </div>
          </div>
          <div class="prog-holder">
            <h4>JavaScript</h4>
            <div class="prog">
              <span style="width: 80%" data-progress="80%"></span>
            </div>
          </div>
          <div class="prog-holder">
            <h4>Php</h4>
            <div class="prog">
              <span style="width: 90%" data-progress="90%"></span>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- End Skills -->
    <!-- Start Quote -->
    <section class="quote">
      <div class="container">
        <q>accumsan id imperdiet et, porttitor at sem. Mauris blandit aliquet elit, eget tincidunt.</q>
        <span>John Doe</span>
      </div>
    </section>
    <!-- End Quote -->
    <!-- Start Pricing -->
    <section class="pricing" id="pricing">
      <div class="container">
        <div class="main-heading">
          <h2>Pricing</h2>
          <p>
            Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Mauris blandit aliquet elit, eget
            tincidunt.
          </p>
        </div>
        <div class="plans">
          <div class="plan">
            <div class="head">
              <h3>Basic</h3>
              <span>19</span>
            </div>
            <ul>
              <li>Feature No 1</li>
              <li>Extra Feature</li>
              <li>Extra Feature No 2</li>
              <li>Feature</li>
            </ul>
            <div class="foot">
              <a href="#">Buy Now</a>
            </div>
          </div>
          <div class="plan">
            <div class="head">
              <h3>Premium</h3>
              <span>29</span>
            </div>
            <ul>
              <li>Feature No 1</li>
              <li>Extra Feature</li>
              <li>Extra Feature No 2</li>
              <li>Feature</li>
            </ul>
            <div class="foot">
              <a href="#">Buy Now</a>
            </div>
          </div>
          <div class="plan">
            <div class="head">
              <h3>Pro</h3>
              <span>39</span>
            </div>
            <ul>
              <li>Feature No 1</li>
              <li>Extra Feature</li>
              <li>Extra Feature No 2</li>
              <li>Feature</li>
            </ul>
            <div class="foot">
              <a href="#">Buy Now</a>
            </div>
          </div>
          <div class="plan">
            <div class="head">
              <h3>Platinum</h3>
              <span>49</span>
            </div>
            <ul>
              <li>Feature No 1</li>
              <li>Extra Feature</li>
              <li>Extra Feature No 2</li>
              <li>Feature</li>
            </ul>
            <div class="foot">
              <a href="#">Buy Now</a>
            </div>
          </div>
        </div>
        <p class="contact-text">Contact us if you have special request</p>
        <a href="#contact" class="contact-link">Contact Us</a>
      </div>
    </section>
    <!-- End Pricing -->
    <!-- Start Subscribe -->
    <section class="subscribe">
      <div class="container">
        <form action="" method="post" novalidate>
          <i class="far fa-envelope fa-lg" aria-hidden="true"></i>
          <label for="subscribe-email" class="visually-hidden">Your email</label>
          <input
            type="email"
            id="subscribe-email"
            name="mail"
            placeholder="Your Email"
            required
            maxlength="254"
            autocomplete="email"
            aria-describedby="subscribe-email-error"
          />
          <input type="submit" value="Subscribe" />
          <p class="field-error" id="subscribe-email-error"></p>
          <p class="form-status" role="status"></p>
        </form>
        <p>
          Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Mauris blandit aliquet elit, eget tincidunt.
        </p>
      </div>
    </section>
    <!-- End Subscribe -->
    <!-- Start Contact -->
    <section class="contact" id="contact">
      <div class="container">
        <div class="main-heading">
          <h2>Contact Us</h2>
          <p>
            Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Mauris blandit aliquet elit, eget
            tincidunt.
          </p>
        </div>
        <div class="content">
          <form action="" method="post" novalidate>
            <label for="contact-name" class="visually-hidden">Your name</label>
            <input
              class="main-input"
              type="text"
              id="contact-name"
              name="name"
              placeholder="Your Name"
              required
              minlength="2"
              maxlength="100"
              autocomplete="name"
              aria-describedby="contact-name-error"
            />
            <p class="field-error" id="contact-name-error"></p>

            <label for="contact-email" class="visually-hidden">Your email</label>
            <input
              class="main-input"
              type="email"
              id="contact-email"
              name="mail"
              placeholder="Your Email"
              required
              maxlength="254"
              autocomplete="email"
              aria-describedby="contact-email-error"
            />
            <p class="field-error" id="contact-email-error"></p>

            <label for="contact-message" class="visually-hidden">Your message</label>
            <textarea
              class="main-input"
              id="contact-message"
              name="message"
              placeholder="Your Message"
              required
              minlength="10"
              maxlength="2000"
              aria-describedby="contact-message-error"
            ></textarea>
            <p class="field-error" id="contact-message-error"></p>

            <input type="submit" value="Send Message" />
            <p class="form-status" role="status"></p>
          </form>
          <div class="info">
            <h4>Get In Touch</h4>
            <span class="phone">+00 123.456.789</span>
            <span class="phone">+00 123.456.789</span>
            <h4>Where We Are</h4>
            <address>Awesome Address 17<br />New York, NYC<br />123-4567-890<br />USA</address>
          </div>
        </div>
      </div>
    </section>
    <!-- End Contact -->
<?php require __DIR__ . '/includes/footer.php'; ?>
