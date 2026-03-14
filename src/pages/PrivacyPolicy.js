import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div style={styles.legalContainer}>
      <h1>Privacy Policy for Bharath Darshika</h1>
      <p>Last updated: March 2026</p>

      <section>
        <h2>Introduction</h2>
        <p>
          Welcome to <strong>Bharath Darshika</strong>. Your privacy is important to us.
          Bharath Darshika is a tourism information application designed to help
          users explore Indian heritage, devotional places, hill stations, beaches,
          wildlife destinations and waterfalls.
        </p>
      </section>

      <section>
        <h2>1. Information We Collect</h2>
        <p>
          Bharath Darshika does <strong>not collect personal information</strong> such as:
        </p>
        <ul>
          <li>Name</li>
          <li>Email Address</li>
          <li>Phone Number</li>
          <li>Password</li>
        </ul>
        <p>
          The application is purely content-driven and users can explore tourism
          information without creating an account.
        </p>
      </section>

      <section>
        <h2>2. Location Permission</h2>
        <p>
          Our app may request access to your device location to help users find
          nearby tourist attractions, hospitals and police stations through
          <strong> Google Maps</strong>.
        </p>
        <p>
          This location data is processed by Google services and is not stored
          on Bharath Darshika servers.
        </p>
      </section>

      <section>
        <h2>3. Third-Party Services</h2>
        <p>
          Bharath Darshika may redirect users to third-party platforms for
          additional information or services.
        </p>
        <ul>
          <li>Google Maps – Navigation and directions</li>
          <li>YouTube – Travel videos and virtual tours</li>
          <li>Wikipedia – Historical information</li>
          <li>Rentora – Vehicle rental services</li>
          <li>WhatsApp / Instagram – Support and tour contact</li>
        </ul>
        <p>
          These services operate under their own privacy policies and Bharath
          Darshika is not responsible for their data practices.
        </p>
      </section>

      <section>
        <h2>4. Data Storage</h2>
        <p>
          We use <strong>Google Firebase</strong> to store tourism related data such
          as history, mystery content, and images of tourist locations.
          No personal user data is stored in our database.
        </p>
      </section>

      <section>
        <h2>5. Advertisements</h2>
        <p>
          The app may display third-party advertisements. Advertising providers
          may use device identifiers or cookies to show relevant ads.
        </p>
      </section>

      <section>
        <h2>6. Children's Privacy</h2>
        <p>
          Bharath Darshika does not knowingly collect personal data from
          children under the age of 13.
        </p>
      </section>

      <section>
        <h2>7. Changes to This Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Users are advised
          to review this page periodically for any updates.
        </p>
      </section>

      <section>
        <h2>8. Contact Us</h2>
        <p>
          If you have any questions regarding this Privacy Policy, you can contact us at:
        </p>
        <p><strong>Email:</strong> ghantasaibabu@example.com</p>
      </section>

    </div>
  );
}

const styles = {
  legalContainer: {
    padding: '50px',
    maxWidth: '900px',
    margin: 'auto',
    color: '#333',
    lineHeight: '1.8',
    fontFamily: 'Arial, sans-serif'
  }
};
