pipeline {

    agent any

    tools {
        nodejs "NodeJS20"
    }

    environment {
        EMAIL = "test@gmail.com"
        PASSWORD = "test123"
    }

    stages {

        stage('Install Backend Dependencies') {
            steps {
                dir('backend') {
                    sh 'npm ci'
                }
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                dir('frontend') {
                    sh 'npm ci'
                }
            }
        }

        stage('Install Automation Dependencies') {
            steps {
                dir('automation') {
                    sh 'npm ci'
                }
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                dir('automation') {
                    sh 'npx playwright install --with-deps'
                }
            }
        }

        stage('Start Backend') {
            steps {
                dir('backend') {
                    sh 'npm start &'
                }
            }
        }

        stage('Start Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm run dev &'
                }
            }
        }

        stage('Wait For Applications') {
            steps {
                sh 'npx wait-on http://localhost:5000'
                sh 'npx wait-on http://localhost:5173'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                dir('automation') {
                    sh 'npx playwright test'
                }
            }
        }

    }

    post {

        always {

            archiveArtifacts artifacts: 'automation/playwright-report/**/*', fingerprint: true

        }

    }

}