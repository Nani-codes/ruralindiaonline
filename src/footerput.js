const { FOOTER_URL } = require('./config');  // Use require to import FOOTER_URL
const fetch = require('node-fetch'); // Ensure you're using node-fetch

const updateFooterLinks = async () => {
  const url = 'https://dev.ruralindiaonline.org/v1/api/footer?populate=*'; // API endpoint
  const token = 'YOUR_ACCESS_TOKEN';  // Replace with your actual API token

  const data = {
    data: {
      id: 1, // The footer ID you want to update (make sure it's correct)
      attributes: {
        title: "Welcome to PARI",  // Example: retain any other existing fields that need to be updated
        description: "All our content is, and will forever be free to consume. If you enjoy our work, you can support us by becoming a volunteer or by donating to help fund our work.",
        sign_up_for_our_newsletter: "Sign up for our newsletter",
        email_address: "Email Address ",
        subscribe: "Subscribe",
        footer_links: [ // Updated footer links data
          {
            id: 1,
            name: 'All stories',
            link: `${FOOTER_URL}/articles?type=article`,  // Replace domain with FOOTER_URL
            react_icon: 'FiBookOpen'
          },
          {
            id: 9,
            name: 'Contribute Content',
            link: `${FOOTER_URL}/en/contribute`,  // Replace domain with FOOTER_URL
            react_icon: null
          },
          {
            id: 7,
            name: 'Story of PARI',
            link: `${FOOTER_URL}/en/article/Many-Worlds-One-Website-en`,  // Replace domain with FOOTER_URL
            react_icon: null
          },
          {
            id: 13,
            name: 'Copyrights',
            link: `${FOOTER_URL}/en/copyrights`,  // Replace domain with FOOTER_URL
            react_icon: null
          },
          {
            id: 2,
            name: 'Library',
            link: `${FOOTER_URL}/en/library/`,  // Replace domain with FOOTER_URL
            react_icon: null
          },
          {
            id: 11,
            name: 'Volunteer',
            link: `${FOOTER_URL}/Inprogress`,  // Replace domain with FOOTER_URL
            react_icon: null
          },
          {
            id: 6,
            name: 'Our team',
            link: `${FOOTER_URL}/Inprogress`,  // Replace domain with FOOTER_URL
            react_icon: null
          },
          {
            id: 16,
            name: 'Grievances Redressal',
            link: `${FOOTER_URL}/grievance`,  // Replace domain with FOOTER_URL
            react_icon: null
          },
          {
            id: 3,
            name: 'Education',
            link: `${FOOTER_URL}/education`,  // Replace domain with FOOTER_URL
            react_icon: null
          },
          {
            id: 10,
            name: 'Intern',
            link: `${FOOTER_URL}/Inprogress`,  // Replace domain with FOOTER_URL
            react_icon: null
          },
          {
            id: 8,
            name: 'Acknowledgements',
            link: `${FOOTER_URL}/acknowledgment/`,  // Replace domain with FOOTER_URL
            react_icon: null
          },
          {
            id: 15,
            name: 'Terms and Conditions',
            link: `${FOOTER_URL}/termsofservices`,  // Replace domain with FOOTER_URL
            react_icon: null
          },
          {
            id: 5,
            name: 'FACES',
            link: `${FOOTER_URL}/en/categories/faces/`,  // Replace domain with FOOTER_URL
            react_icon: null
          },
          {
            id: 14,
            name: 'Contact Us',
            link: `${FOOTER_URL}/getintouch`,  // Replace domain with FOOTER_URL
            react_icon: null
          },
          {
            id: 4,
            name: 'Donate',
            link: `${FOOTER_URL}/en/pages/donate/`,  // Replace domain with FOOTER_URL
            react_icon: null
          }
        ]
      }
    }
  };


  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${token}`, // If an authorization token is needed
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to update footer links: ${response.status} - ${errorText}`);
    }

    const responseData = await response.json();
    // console.log('Footer links updated successfully:', responseData);
  } catch (error) {
    console.error('Error updating footer links:', error);
  }
};

// Call the function to update footer links
updateFooterLinks();
