import streamlit as st
from datetime import datetime, timedelta
import pandas as pd

# Translations
translations = {
    "en": {
        "title": "Can Ribot Portocolom",
        "home": "Home",
        "gallery": "Gallery",
        "description": "Description",
        "availability": "Availability",
        "recommendations": "Recommendations",
        "faq": "FAQ",
        "welcome_title": "Welcome to Our Portocolom Home",
        "welcome_text": "Enjoy your stay in our cozy apartment, available for 10 months of the year.",
        "amenities": "Amenities",
        "amenities_list": [
            "3 bedrooms (one double, one single, and one with two single beds)",
            "Fully equipped kitchen",
            "Spacious living room",
            "High-speed Wi-Fi",
            "Air conditioning",
            "Sea view, community swimming pool and grass"
            "Close to beach and local attractions"
        ],
        "contact": "Contact",
        "contact_text": "For bookings and inquiries, please email: jaumevr15@gmail.com",
        "gallery_title": "Photo Gallery",
        "availability_title": "Check Availability",
        "availability_text": "Select a date to check availability.",
        "recommendations_title": "Local Recommendations",
        "recommendations_text": "Coming soon: Our top picks for restaurants, activities, and attractions in the area.",
        "faq_title": "Frequently Asked Questions",
        "faq_text": "Coming soon: Answers to common questions about your stay.",
    },
    "ca": {
        # Catalan translations (to be filled)
    },
    "es": {
        # Spanish translations (to be filled)
    }
}

# Function to get translated text
def get_text(key):
    return translations[st.session_state.language][key]

# Initialize session state for language
if 'language' not in st.session_state:
    st.session_state.language = 'en'

# Sidebar for language selection
language = st.sidebar.selectbox(
    "Language / Idioma / Llengua",
    options=['en', 'es', 'ca'],
    format_func=lambda x: {'en': 'English', 'es': 'Español', 'ca': 'Català'}[x],
    key='language'
)

# Main app layout
st.title(get_text("title"))

# Navigation
page = st.sidebar.radio(
    "Navigation",
    [get_text("home"), get_text("gallery"), get_text("availability"), 
     get_text("recommendations"), get_text("faq")]
)

if page == get_text("home"):
    st.header(get_text("welcome_title"))
    st.write(get_text("welcome_text"))
    
    st.subheader(get_text("amenities"))
    for amenity in get_text("amenities_list"):
        st.write(f"- {amenity}")
    
    st.subheader(get_text("contact"))
    st.write(get_text("contact_text"))

elif page == get_text("gallery"):
    st.header(get_text("gallery_title"))
    col1, col2 = st.columns(2)
    
    # Replace these with your actual image paths
    images = [
        "https://via.placeholder.com/400x300.png?text=Living+Room",
        "https://via.placeholder.com/400x300.png?text=Kitchen",
        "https://via.placeholder.com/400x300.png?text=Bedroom",
        "https://via.placeholder.com/400x300.png?text=Bathroom"
    ]
    
    with col1:
        st.image(images[0], use_column_width=True)
        st.image(images[2], use_column_width=True)
    with col2:
        st.image(images[1], use_column_width=True)
        st.image(images[3], use_column_width=True)

elif page == get_text("availability"):
    st.header(get_text("availability_title"))
    st.write(get_text("availability_text"))
    
    # Simple availability calendar (you may want to replace this with a more sophisticated solution)
    start_date = st.date_input("Start date", datetime.now())
    end_date = st.date_input("End date", datetime.now() + timedelta(days=7))
    
    # This is a placeholder. In a real app, you'd check these dates against your actual availability data.
    if st.button("Check Availability"):
        st.success(f"The apartment is available from {start_date} to {end_date}!")

elif page == get_text("recommendations"):
    st.header(get_text("recommendations_title"))
    st.write(get_text("recommendations_text"))

elif page == get_text("faq"):
    st.header(get_text("faq_title"))
    st.write(get_text("faq_text"))

# You can add more sections or features as needed