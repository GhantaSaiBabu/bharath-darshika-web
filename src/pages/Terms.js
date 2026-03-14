import React from 'react';

export default function TermsConditions() {
  return (
    <div style={styles.legalContainer}>
      <h1>Terms & Conditions for Bharath Darshika</h1>
      <p>Last updated: March 2026</p>

      <section>
        <h2>1. Acceptance of Terms</h2>
        <p>
          By downloading or using the <strong>Bharath Darshika</strong> mobile application,
          you agree to these Terms & Conditions. If you do not agree with these terms,
          please discontinue using the application.
        </p>
      </section>

      <section>
        <h2>2. Purpose of the Application</h2>
        <p>
          Bharath Darshika is a tourism discovery application that provides information
          about Indian travel destinations including:
        </p>
        <ul>
          <li>Devotional Places</li>
          <li>Beaches</li>
          <li>Hill Stations</li>
          <li>Heritage Sites</li>
          <li>Wildlife Destinations</li>
          <li>Waterfalls</li>
        </ul>
        <p>
          The content provided in the app is intended for informational and educational purposes only.
        </p>
      </section>

      <section>
        <h2>3. Accuracy of Information</h2>
        <p>
          We strive to keep the information accurate and updated. However,
          Bharath Darshika does not guarantee the completeness, reliability,
          or accuracy of tourism information, historical descriptions, or travel data.
        </p>
      </section>

      <section>
        <h2>4. Third-Party Services</h2>
        <p>
          Bharath Darshika may redirect users to third-party platforms including:
        </p>
        <ul>
          <li>Google Maps – Navigation</li>
          <li>YouTube – Travel videos</li>
          <li>Wikipedia – Historical references</li>
          <li>Rentora – Vehicle rental services</li>
          <li>WhatsApp / Instagram – Customer support</li>
        </ul>
        <p>
          We do not control these services and are not responsible for the content,
          policies, or services provided by these third-party platforms.
        </p>
      </section>

      <section>
        <h2>5. User Responsibility</h2>
        <p>
          Users are responsible for following local laws, government regulations,
          and respecting cultural and heritage sites during travel.
          Bharath Darshika is not responsible for any travel accidents,
          losses, or issues that occur during visits to tourist locations.
        </p>
      </section>

      <section>
        <h2>6. Service Availability</h2>
        <p>
          We aim to keep the application available at all times. However,
          we cannot guarantee uninterrupted service due to technical
          maintenance, updates, or server issues.
        </p>
      </section>

      <section>
        <h2>7. Changes to Terms</h2>
        <p>
          We may update these Terms & Conditions from time to time.
          Any changes will be reflected on this page with an updated date.
        </p>
      </section>

      <section>
        <h2>8. Contact Us</h2>
        <p>
          If you have any questions regarding these Terms & Conditions,
          please contact us at:
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
