@Library('shared-library')_
def deployImage = new DeployImage()
env.nodeName = ""

pipeline {
    parameters {
        string(name: 'PRODUCTION_NAMESPACE',       description: 'Production Namespace',                 defaultValue: 'indibox-plus-prod')
        string(name: 'STAGING_NAMESPACE',          description: 'Staging Namespace',                    defaultValue: 'indibox-plus-stage')
        string(name: 'DEVELOPMENT_NAMESPACE',      description: 'Development Namespace',                defaultValue: 'indibox-plus-dev')

        string(name: 'DOCKER_IMAGE_NAME',          description: 'Docker Image Name',                    defaultValue: 'indibox-plus-oona-dashboard')

        string(name: 'CHAT_ID',                    description: 'chat id of telegram group',            defaultValue: '-383243277')
    }
    agent none
    options {
        skipDefaultCheckout()  // Skip default checkout behavior
    }
    stages {
        stage ( "Kill Old Build" ){
            steps{
                script{
                    KillOldBuild()
        }   }   }
        stage('Checkout SCM') {
            agent { label "nodejs" }
            steps {
                checkout scm
                script {
                    echo "get COMMIT_ID"
                    sh 'echo -n $(git rev-parse --short HEAD) > ./commit-id'
                    commitId = readFile('./commit-id')
                }
                stash(name: 'ws', includes:'**,./commit-id') // stash this current workspace
        }   }
        stage('Initialize') {
            parallel {
                stage("Agent: nodejs") {
                    agent { label "nodejs" }
                    steps {
                        cleanWs()
                           }   }
                stage("Agent: Docker") {
                    agent { label "Docker" }
                    steps {
                        cleanWs()
                        script{
                            if ( env.BRANCH_NAME == 'master' ){
                                envStage = "production"
                            } else if ( env.BRANCH_NAME == 'release' ){
                                envStage = "staging"
                            } else if ( env.BRANCH_NAME == 'develop'){
                                envStage = "development"
        }   }   }   }   }   }
        stage('Test & Build') {
            parallel {
                stage('Unit Test') {
                    agent { label "nodejs" }
                    steps {
                        unstash 'ws'
                        script {
                            echo "Do Unit Test Here"
                            def node = tool name: 'NodeJS-8.9', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
                            env.PATH = "${node}/bin:${env.PATH}"
                            sh "npm install"
                            sh "npm run test:cover"
                            echo "defining sonar-scanner"
                            def scannerHome = tool 'SonarScanner' ;
                            withSonarQubeEnv('SonarQube') {
                                sh "${scannerHome}/bin/sonar-scanner"
                }   }   }   }
                stage('Build') {
                    agent { label "Docker" }
                    steps {
                        unstash 'ws'
                        script{
                            env.nodeName = "${env.NODE_NAME}"
                            sh "docker build --build-arg ARGS_NODE_BUILD=${envStage} --rm --no-cache --pull -t ${params.DOCKER_IMAGE_NAME}:${BUILD_NUMBER}-${commitId} ."
        }   }   }   }   }
        stage ('Deployment'){
            steps{
                node (nodeName as String) { 
                    echo "Running on ${nodeName}"
                    script{
                        if (env.BRANCH_NAME == 'master'){
                            echo "Deploying to ${envStage} "
                            deployImage.to_vsan("${commitId}")
                        } else if (env.BRANCH_NAME == 'release'){
                            echo "Deploying to ${envStage} "
                            deployImage.to_stage("${commitId}")
                        } else if (env.BRANCH_NAME == 'develop'){
                            echo "Deploying to ${envStage} "
                            deployImage.to_vsan("${commitId}")
    }   }   }   }   }
        stage('Burp Test') {
            agent { label "Ansible" }
            steps {
                unstash 'ws'
                script {
                    echo 'Invoke Security Test...'
                    sh 'curl -D find.txt -vkgw "\n" -X POST \'https://burp.playcourt.id/api/uqW6ZXXeeKjzdVLx7ekXvuDRsKXRf6V5/v0.1/scan\' -d \'{"name":"indibox-oona-stage-fe","urls":["https://dashboard-oona-stage.indibox.id"]}\''
                    echo 'Scanning...'
                    waitUntil {
                        sh '''
                        sleep 120
                        location=`cat find.txt | grep Location | awk -F' ' '{print $2}' | tr -d '\r' | tr -d '\n'`
                        echo "${location}"
                        curl -vkgw "\n" -X GET "https://burp.playcourt.id/api/uqW6ZXXeeKjzdVLx7ekXvuDRsKXRf6V5/v0.1/scan/${location}" > result.txt
                        '''
                        status = sh (
                                returnStdout: true,
                                script: "cat result.txt | awk -F' ' '{print \$1}' | cut -d',' -f2 | cut -d':' -f2 | cut -d'\"' -f2"
                                ).trim()
                        echo "${status}"
                        println status == "succeeded"
                        
                        if (status.equals('succeeded')){
                        echo 'Scan Succeeded...'
                        println status == "succeeded"
                        return true
                        } else if(status.equals('crawling')){
                        echo 'Crawling...'
                        return false
                        } else if(status.equals('auditing')){
                        echo 'Auditing...'
                        return false
                        } else {
                        error 'Scan Failed...'
                        return false
    }   }   }   }   }   }
    post {
        always{
            node("Docker"){
                TelegramNotif(currentBuild.currentResult) 
	}   }
	failure{
            node(nodeName as String){
                script{
                    sh "docker rmi -f ${params.DOCKER_IMAGE_NAME}:${BUILD_NUMBER}-${commitId}"
}   }   }   }   }
