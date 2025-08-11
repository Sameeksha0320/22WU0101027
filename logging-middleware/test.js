const { Log, getAuthToken } = require('./index.js');

async function testLogging() {
    try {
        // Replace these with your actual credentials from registration
        await getAuthToken({
            email: "sameeksha.d_2026@woxsen.edu.in",
            name: "D Sameeksha",
            rollNo: "22WU0101027",
            accessCode: "UMXVQT",
            clientID: " a6b51ca9-9c7c-453d-bc22-884e6ad0bd05",
            clientSecret: "jByHHbSpZtmcwzCG "
        });
        
        console.log('Testing logging...');
        
        // Test with shorter messages (under 48 characters)
        await Log("backend", "info", "handler", "App started successfully");
        await Log("frontend", "debug", "component", "Component loaded");
        await Log("backend", "error", "db", "DB connection failed");
        
        console.log('All tests completed successfully!');
        
    } catch (error) {
        console.error('Test failed:', error.message);
    }
}

testLogging();