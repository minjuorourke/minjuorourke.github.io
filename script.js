// Image handling and dynamic content updates
class StudioWebsite {
    constructor() {
        this.mainImage = document.getElementById('main-image');
        this.init();
    }

    init() {
        // Load saved image URL from localStorage if available
        const savedImageUrl = localStorage.getItem('studioImageUrl');
        if (savedImageUrl) {
            this.updateImage(savedImageUrl);
        }

        // Add click handler to image for easy replacement
        this.mainImage.addEventListener('click', () => {
            this.promptForNewImage();
        });

        // Add keyboard shortcut for image replacement (Ctrl/Cmd + I)
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'i') {
                e.preventDefault();
                this.promptForNewImage();
            }
        });
    }

    updateImage(imageUrl) {
        if (imageUrl && this.isValidImageUrl(imageUrl)) {
            this.mainImage.src = imageUrl;
            this.mainImage.alt = 'Custom Image';
            localStorage.setItem('studioImageUrl', imageUrl);
            console.log('Image updated successfully');
        } else {
            console.error('Invalid image URL provided');
        }
    }

    isValidImageUrl(url) {
        try {
            new URL(url);
            return /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url) || url.includes('placeholder');
        } catch {
            return false;
        }
    }

    promptForNewImage() {
        const imageUrl = prompt('Enter the URL of your new image:');
        if (imageUrl) {
            this.updateImage(imageUrl);
        }
    }

    // Method to update text content dynamically
    updateContent(options = {}) {
        const {
            title = 'studio',
            code1 = 'SJ-485',
            code2 = '34-94-28',
            documentTitle = 'test studio document',
            subtitle = 'docs + notes',
            caption = 'B+T Design, Silver chair, 2003',
            description = null
        } = options;

        // Update title
        const titleElement = document.querySelector('.main-title');
        if (titleElement) titleElement.textContent = title;

        // Update codes
        const codeElements = document.querySelectorAll('.info-code');
        if (codeElements[0]) codeElements[0].textContent = code1;
        if (codeElements[1]) codeElements[1].textContent = code2;

        // Update description section
        const descTitle = document.querySelector('.description-title');
        const descSubtitle = document.querySelector('.description-subtitle');
        const descCaption = document.querySelector('.description-caption');
        
        if (descTitle) descTitle.textContent = documentTitle;
        if (descSubtitle) descSubtitle.textContent = subtitle;
        if (descCaption) descCaption.textContent = caption;

        // Update description text if provided
        if (description) {
            const descText = document.querySelector('.lorem-text');
            if (descText) descText.textContent = description;
        }
    }
}

// Initialize the website when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.studioWebsite = new StudioWebsite();
    
    // Example of how to update content programmatically
    // Uncomment and modify these lines to customize your content:
    
    // window.studioWebsite.updateContent({
    //     title: 'your name',
    //     code1: 'YOUR-001',
    //     code2: '2024-01',
    //     documentTitle: 'portfolio showcase',
    //     subtitle: 'projects + work',
    //     caption: 'Your Name, Project Title, 2024',
    //     description: 'Your custom description text here...'
    // });
});

// Utility function to easily update image from browser console
window.updateStudioImage = function(imageUrl) {
    if (window.studioWebsite) {
        window.studioWebsite.updateImage(imageUrl);
    } else {
        console.error('Studio website not initialized yet');
    }
};

// Utility function to easily update content from browser console
window.updateStudioContent = function(options) {
    if (window.studioWebsite) {
        window.studioWebsite.updateContent(options);
    } else {
        console.error('Studio website not initialized yet');
    }
};
