document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");
    const submitButton = document.getElementById("form-button");
    

    submitButton.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent default form submission
    let isValid = true;

        // Get all form fields
        let inputs = document.querySelectorAll("#contact-form input, #contact-form select, #contact-form textarea");

        // Regex patterns
        let namePattern = /^[A-Za-z]+$/;
        let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        let phonePattern = /^[0-9]{10}$/; // 10-digit phone number

        // Validation function
        function validateField(input, pattern, required = true) {
            if (input) {
                let value = input.value.trim();
                if (required && value === "") {
                    input.style.borderColor = "red";
                    isValid = false;
                } else if (!required || pattern.test(value)) {
                    input.style.borderColor = "green";
                } else {
                    input.style.borderColor = "red";
                    isValid = false;
                }
            }
        }

        // Validate required fields
        validateField(document.getElementById("firstName"), namePattern);
        validateField(document.getElementById("lastName"), namePattern);
        validateField(document.getElementById("email"), emailPattern);

        // Validate phone number (only if input is provided)
        let phoneInput = document.getElementById("number");
        if (phoneInput && phoneInput.value.trim() !== "") {
            validateField(phoneInput, phonePattern, false);
        }

        // Validate WhatsApp number (only if input is provided)
        let watsNumberInput = document.getElementById("watsNumber");
        if (watsNumberInput && watsNumberInput.value.trim() !== "") {
            validateField(watsNumberInput, phonePattern, false);
        }

        // Validate select dropdown
        let service = document.getElementById("service");
        if (service) {
            if (service.value === "") {
                service.style.borderColor = "red";
                isValid = false;
            } else {
                service.style.borderColor = "green";
            }
        }

        // Validate comments (only if input is provided)
        let comments = document.getElementById("comments");
        if (comments && comments.value.trim() !== "") {
            comments.style.borderColor = "green";
        }

        // If valid, log data & reset form
        if (isValid) {

            
            const afterSuc = document.getElementById("afterSuc");

            afterSuc.style.display= "block";


            setTimeout(() => {
                afterSuc.style.display = "none";
            }, 3000);



            // alert("Form Submitted Successfully!");
            console.log({
                firstName: document.getElementById("firstName")?.value.trim(),
                lastName: document.getElementById("lastName")?.value.trim(),
                email: document.getElementById("email")?.value.trim(),
                number: phoneInput?.value.trim() || "Not Provided", // Optional field
                watsNumber: watsNumberInput?.value.trim() || "Not Provided", // Optional field
                service: service?.value,
                comments: comments?.value.trim() || "Not Provided" // Optional field
            });

            // **Reset form when successfully submitted**
            form.reset();

            // Reset border colors
            document.querySelectorAll("#contact-form input, #contact-form select, #contact-form textarea").forEach(input => {
                input.style.borderColor = "#ccc"; // Default border color
            });
        }
        
    });

    // Reset border color when user starts typing
    document.querySelectorAll("#contact-form input, #contact-form select, #contact-form textarea").forEach(input => {
        input.addEventListener("input", function () {
            this.style.borderColor = "#ccc"; // Reset to default
        });
    });

    
    
    
});









document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('stars');
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions to match parent
    function resizeCanvas() {
        const parent = canvas.parentElement;
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Create stars
    const stars = [];
    const starCount = 100;
    
    for (let i = 0; i < starCount; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5,
            opacity: Math.random() * 0.8 + 0.2,
            speed: Math.random() * 0.05
        });
    }
    
    // Animate stars
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        stars.forEach(star => {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
            ctx.fill();
            
            // Twinkle effect
            star.opacity += Math.random() * 0.01 - 0.005;
            if (star.opacity < 0.2) star.opacity = 0.2;
            if (star.opacity > 1) star.opacity = 1;
            
            // Move stars slightly
            star.y += star.speed;
            
            // Reset position if star goes out of bounds
            if (star.y > canvas.height) {
                star.y = 0;
                star.x = Math.random() * canvas.width;
            }
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
});




