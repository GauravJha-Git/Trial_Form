document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");
    const submitButton = document.getElementById("form-button");
    const afterSuc = document.getElementById("afterSuc");
    
    // Regex patterns
    const namePattern = /^[A-Za-z]+$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phonePattern = /^[0-9]{10}$/;

    // Validation function
    function validateField(input, pattern, required = true) {
        if (input) {
            let value = input.value.trim();
            if (required && value === "") {
                input.style.borderColor = "red";
                return false;
            } else if (!required || pattern.test(value)) {
                input.style.borderColor = "green";
                return true;
            } else {
                input.style.borderColor = "red";
                return false;
            }
        }
        return true;
    }

    // Reset border color when user starts typing
    document.querySelectorAll("#contact-form input, #contact-form select, #contact-form textarea").forEach(input => {
        input.addEventListener("input", function () {
            this.style.borderColor = "#ccc";
        });
    });

    const API_URL = 'http://localhost:5001/api/form/submit';

    submitButton.addEventListener("click", async function (event) {
        event.preventDefault();
        let isValid = true;

        // Validate required fields
        isValid = validateField(document.getElementById("firstName"), namePattern) && isValid;
        isValid = validateField(document.getElementById("lastName"), namePattern) && isValid;
        isValid = validateField(document.getElementById("email"), emailPattern) && isValid;
        isValid = validateField(document.getElementById("number"), phonePattern) && isValid;

        // Validate WhatsApp number (optional)
        let watsNumberInput = document.getElementById("watsNumber");
        if (watsNumberInput && watsNumberInput.value.trim() !== "") {
            isValid = validateField(watsNumberInput, phonePattern, false) && isValid;
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

        if (isValid) {
            const formData = {
                firstName: document.getElementById("firstName").value.trim(),
                lastName: document.getElementById("lastName").value.trim(),
                email: document.getElementById("email").value.trim(),
                number: document.getElementById("number").value.trim(),
                watsNumber: watsNumberInput?.value.trim() || "",
                service: service.value,
                comments: document.getElementById("comments")?.value.trim() || ""
            };

            try {
                console.log("Sending form data to:", API_URL);
                console.log("Form data:", formData);
                
                const response = await fetch(API_URL, {
                    method: "POST",
                    headers: { 
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify(formData)
                });

                console.log("Response status:", response.status);
                const result = await response.json();
                console.log("Response data:", result);

                if (response.ok) {
                    // Show success message immediately
                    afterSuc.style.display = "block";
                    afterSuc.style.opacity = "1";
                    
                    // Reset form
                    form.reset();
                    document.querySelectorAll("#contact-form input, #contact-form select, #contact-form textarea").forEach(input => {
                        input.style.borderColor = "#ccc";
                    });

                    // Hide success message after 3 seconds with fade effect
                    setTimeout(() => {
                        afterSuc.style.opacity = "0";
                        setTimeout(() => {
                            afterSuc.style.display = "none";
                        }, 500); // Wait for fade out animation
                    }, 2500); // Reduced from 3000 to 2500 to account for fade out
                } else {
                    throw new Error(result.message || 'Failed to submit form');
                }
            } catch (error) {
                console.error("Error submitting form:", error);
                alert("❌ Error submitting form: " + error.message);
            }
        }
    });
});

// Star animation code
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('stars');
    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        const parent = canvas.parentElement;
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
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
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        stars.forEach(star => {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
            ctx.fill();
            
            star.opacity += Math.random() * 0.01 - 0.005;
            if (star.opacity < 0.2) star.opacity = 0.2;
            if (star.opacity > 1) star.opacity = 1;
            
            star.y += star.speed;
            
            if (star.y > canvas.height) {
                star.y = 0;
                star.x = Math.random() * canvas.width;
            }
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
});


