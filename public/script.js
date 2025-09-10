document.addEventListener('DOMContentLoaded', () => {
    // --- 元素获取 ---
    const onboardingModal = document.getElementById('onboarding-modal');
    const userInfoForm = document.getElementById('user-info-form');
    const planRequestModal = document.getElementById('plan-request-modal'); // 新增
    const planRequestForm = document.getElementById('plan-request-form'); // 新增
    const profileText = document.getElementById('profile-text');
    const editProfileBtn = document.getElementById('edit-profile-btn');
    const navButtons = document.querySelectorAll('.nav-btn');
    const contentSlider = document.getElementById('content-slider');
    const generateRouteBtn = document.getElementById('generate-route-btn'); // 新增
    const chatBox = document.getElementById('chat-box');
    const chatInput = document.getElementById('chat-input');
    const sendChatBtn = document.getElementById('send-chat-btn');

    // --- 数据映射 ---
    const goalMap = {
        'weight_loss': '减脂塑形',
        'muscle_gain': '增肌',
        'keep_fit': '保持健康'
    };

    // --- 功能函数 ---

    // 检查用户资料是否存在
    const checkUserProfile = () => {
        const userProfile = localStorage.getItem('userProfile');
        if (!userProfile) {
            onboardingModal.style.display = 'flex';
        } else {
            onboardingModal.style.display = 'none';
            planRequestModal.style.display = 'none';
            const profile = JSON.parse(userProfile);
            updateProfileDisplay(profile);
            // 如果已有计划，可以从localStorage加载，这里为简化，每次都显示模拟数据
            mockFetchInitialPlan();
        }
    };

    // 更新顶部显示的用户信息
    const updateProfileDisplay = (profile) => {
        const displayGoal = goalMap[profile.goal] || profile.goal;
        profileText.textContent = `身高: ${profile.height}cm | 体重: ${profile.weight}kg | 目标: ${displayGoal}`;
    };

    // 渲染锻炼日历
    const renderWorkoutCalendar = (content) => {
        const calendarEl = document.getElementById('workout-calendar');
        // 现在可以直接渲染AI返回的字符串
        calendarEl.innerHTML = `<h3>本周锻炼日历</h3>${content}`;
    };
    
    // 渲染饮食建议
    const renderDietRecommendation = (content) => {
        const dietEl = document.getElementById('diet-recommendation');
        // 现在可以直接渲染AI返回的字符串
        dietEl.innerHTML = `<h3>今日饮食建议</h3>${content}`;
    };

    // 初始化地图
    const initMap = () => {
        try {
            const map = L.map('map').setView([39.9042, 116.4074], 13); // 默认北京
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '© OpenStreetMap'
            }).addTo(map);
        } catch(e) {
            console.error("Map initialization failed:", e);
            document.getElementById('map').innerHTML = "地图加载失败。";
        }
    };

    // --- 【API 预留点 1: 生成健身饮食计划】 ---
    const generatePlanWithAI = async (userProfile, customRequest) => {
        const displayGoal = goalMap[userProfile.goal] || userProfile.goal;
        const prompt = `
            请为我生成一份详细的健身和饮食计划。
            我的基本信息如下：
            - 身高: ${userProfile.height} cm
            - 体重: ${userProfile.weight} kg
            - 健身目标: ${displayGoal}
            - 锻炼频率: ${userProfile.frequency.replace('_', ' ')}

            我的个性化需求是: "${customRequest || '无特殊要求'}"

            请将健身计划和饮食建议清晰地分开。返回格式应为HTML。
            例如：
            <h4>锻炼计划</h4><ul><li>周一：...</li>...</ul>
            <h4>饮食建议</h4><p>早餐：...</p>...
        `;

        // TODO: 在此替换为调用您选择的AI模型的API
        // apiKey 和 apiUrl 仅为示例
        const apiKey = "YOUR_AI_API_KEY"; 
        const apiUrl = "https://your-ai-api-endpoint.com/generate";

        console.log("发送到AI的Prompt:", prompt);

        // 模拟API调用和返回
        renderWorkoutCalendar("AI正在为您生成锻炼计划...");
        renderDietRecommendation("AI正在为您生成饮食建议...");

        // 模拟延迟
        await new Promise(resolve => setTimeout(resolve, 2000));

        // 模拟返回结果
        const mockResponse = `
            <h4>锻炼计划 (根据您的需求定制)</h4>
            <ul>
                <li><strong>星期一:</strong> 上肢力量 (考虑膝盖问题) - 哑铃卧推, 坐姿划船, 侧平举</li>
                <li><strong>星期二:</strong> 休息或低强度有氧 (游泳)</li>
                <li><strong>星期三:</strong> 核心 & 上肢 - 平板支撑, 俄罗斯转体, 弯举</li>
                <li><strong>星期四:</strong> 休息</li>
                <li><strong>星期五:</strong> 全身循环 (低冲击) - 战绳, 药球砸地</li>
                <li><strong>星期六:</strong> 有氧 - 椭圆机30分钟</li>
                <li><strong>星期日:</strong> 休息</li>
            </ul>
            <h4>饮食建议 (地中海式)</h4>
            <p><strong>早餐:</strong> 全麦面包配牛油果和番茄</p>
            <p><strong>午餐:</strong> 烤三文鱼沙拉，搭配橄榄油和柠檬汁</p>
            <p><strong>晚餐:</strong> 鹰嘴豆泥配烤蔬菜和少量鸡胸肉</p>
        `;

        // 实际使用时，请用下面的代码替换上面的模拟部分
        /*
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({ prompt: prompt })
            });

            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }

            const resultText = await response.text(); // 假设API直接返回HTML字符串
            // 解析返回的字符串以区分锻炼和饮食计划
            // ... (需要根据API返回格式进行解析)
            renderWorkoutCalendar(parsedWorkoutPlan);
            renderDietRecommendation(parsedDietPlan);

        } catch (error) {
            console.error("AI plan generation failed:", error);
            renderWorkoutCalendar("<p style='color:red;'>计划生成失败，请稍后再试。</p>");
            renderDietRecommendation("");
        }
        */

       // 这里我们直接使用模拟数据来展示
       const workoutPart = mockResponse.substring(mockResponse.indexOf("<h4>锻炼计划"), mockResponse.indexOf("<h4>饮食建议"));
       const dietPart = mockResponse.substring(mockResponse.indexOf("<h4>饮食建议"));
       renderWorkoutCalendar(workoutPart);
       renderDietRecommendation(dietPart);
    };

    // --- 【API 预留点 2: 生成锻炼路线描述】 ---
    const generateRouteWithAI = async () => {
        const routeRequestInput = document.getElementById('route-request-input');
        const routeDescriptionEl = document.getElementById('route-description');
        const userRequest = routeRequestInput.value.trim();

        if (userRequest === '') {
            routeDescriptionEl.innerHTML = '<p style="color:orange;">请输入您的路线需求。</p>';
            return;
        }

        const prompt = `
            作为一名本地运动向导，请根据以下需求，为我生成一段吸引人的锻炼路线文字描述。
            需求: "${userRequest}"
            请提供路线的大致位置、长度、特点（例如风景、路况、适合时间等）。
        `;

        // TODO: 在此替换为调用您选择的AI模型的API
        const apiKey = "YOUR_AI_API_KEY"; 
        const apiUrl = "https://your-ai-api-endpoint.com/generate_route";

        console.log("发送到AI的Prompt:", prompt);
        routeDescriptionEl.innerHTML = "AI正在规划路线...";

        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 1500));
        const mockResponse = `
            <p>为您推荐一条绝佳的<strong>颐和园附近5公里跑步路线</strong>：</p>
            <ul>
                <li><strong>起点/终点：</strong>颐和园新建宫门。</li>
                <li><strong>路线描述：</strong>从新建宫门出发，沿昆明湖东岸向南，环绕南湖岛一圈后返回。</li>
                <li><strong>长度：</strong>约5.2公里。</li>
                <li><strong>特点：</strong>路面平坦，绿树成荫，可以欣赏到昆明湖和万寿山的壮丽景色。非常适合清晨或傍晚跑步，空气清新，游客较少。</li>
                <li><strong>注意事项：</strong>请注意避让行人和自行车，尤其是在周末。</li>
            </ul>
        `;
        routeDescriptionEl.innerHTML = mockResponse;

        // 实际API调用逻辑
        /*
        try {
            const response = await fetch(apiUrl, { ... });
            const resultText = await response.text();
            routeDescriptionEl.innerHTML = resultText;
        } catch (error) {
            console.error("AI route generation failed:", error);
            routeDescriptionEl.innerHTML = '<p style="color:red;">路线生成失败，请稍后再试。</p>';
        }
        */
    };

    // --- 【API 预留点 3: 运动医疗咨询】 ---
    const sendMessageToAI = async (userMessage) => {
        appendMessage(userMessage, 'user');
        chatInput.value = '';

        const thinkingElement = document.createElement('div');
        thinkingElement.className = 'chat-message ai-message';
        thinkingElement.textContent = 'AI 正在思考中...';
        chatBox.appendChild(thinkingElement);
        chatBox.scrollTop = chatBox.scrollHeight;

        // 从localStorage获取用户资料以提供上下文
        const userProfileString = localStorage.getItem('userProfile');
        const userProfile = userProfileString ? JSON.parse(userProfileString) : {};
        const displayGoal = goalMap[userProfile.goal] || '未指定';
        const profileContext = `用户的基本信息是：身高 ${userProfile.height || '未知'}cm, 体重 ${userProfile.weight || '未知'}kg, 健身目标是 ${displayGoal}.`;
        
        // --- API 调用逻辑 ---
        // TODO: 在此处填入您的 Gemini API 密钥
        const apiKey = ""; // <--- 在这里填入您的有效API密钥
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;

        const systemPrompt = `你是一名专业的运动医疗顾问和健身教练。请根据用户的健康信息和问题，提供专业、简洁、安全的建议。${profileContext} 请用中文回答。`;

        const payload = {
            contents: [{ parts: [{ text: userMessage }] }],
            systemInstruction: { parts: [{ text: systemPrompt }] },
        };
        
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('API Error:', errorData);
                throw new Error(`API 请求失败，状态码: ${response.status}. 请检查您的API Key是否正确或已开启。`);
            }

            const result = await response.json();
            chatBox.removeChild(thinkingElement);

            if (result.candidates && result.candidates.length > 0 && result.candidates[0].content.parts[0].text) {
                const aiResponse = result.candidates[0].content.parts[0].text;
                appendMessage(aiResponse, 'ai');
            } else {
                 appendMessage('抱歉，我暂时无法生成回复，请检查请求或稍后再试。可能是API返回了空内容。', 'ai');
            }
        } catch (error) {
            console.error('聊天功能出错:', error);
            chatBox.removeChild(thinkingElement);
            appendMessage(`抱歉，连接服务时出错：${error.message}`, 'ai');
        }
    };

    const appendMessage = (message, sender) => {
        const messageElement = document.createElement('div');
        messageElement.className = `chat-message ${sender}-message`;
        messageElement.textContent = message;
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight;
    };
    
    // --- 事件监听器 ---

    // 提交基本信息表单
    userInfoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const userProfile = {
            height: document.getElementById('height').value,
            weight: document.getElementById('weight').value,
            goal: document.getElementById('goal').value,
            frequency: document.getElementById('frequency').value
        };
        localStorage.setItem('userProfile', JSON.stringify(userProfile));
        onboardingModal.style.display = 'none';
        planRequestModal.style.display = 'flex'; // 显示第二个模态框
        updateProfileDisplay(userProfile);
    });

    // 提交个性化需求表单
    planRequestForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const customRequest = document.getElementById('custom-plan-request').value;
        const userProfile = JSON.parse(localStorage.getItem('userProfile'));
        planRequestModal.style.display = 'none';
        generatePlanWithAI(userProfile, customRequest); // 调用AI生成计划
    });
    
    // 编辑按钮
    editProfileBtn.addEventListener('click', () => {
        onboardingModal.style.display = 'flex';
    });
    
    // 导航按钮切换
    navButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            contentSlider.style.transform = `translateX(-${index * (100 / navButtons.length)}%)`;
        });
    });

    // 生成路线按钮
    generateRouteBtn.addEventListener('click', generateRouteWithAI);

    // 聊天发送按钮
    sendChatBtn.addEventListener('click', () => sendMessageToAI(chatInput.value.trim()));
    chatInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            sendMessageToAI(chatInput.value.trim());
        }
    });

    // --- 初始化 ---
    checkUserProfile();
    initMap();
    
    // （旧的模拟数据函数，可保留作为备用）
    const mockFetchInitialPlan = () => {
        const workoutPlan = `<ul>
            <li><strong>星期一:</strong> 胸部 & 三头肌 <br> <small>卧推, 绳索下压, 哑铃飞鸟</small></li>
            <li><strong>星期二:</strong> 休息 <br> <small>轻度拉伸或散步</small></li>
            <li><strong>星期三:</strong> 背部 & 二头肌 <br> <small>引体向上, 杠铃划船, 弯举</small></li>
            ...
        </ul>`;
        const dietPlan = `<p><strong>早餐:</strong> 燕麦片，鸡蛋，一杯牛奶</p>
                          <p><strong>午餐:</strong> 鸡胸肉沙拉，糙米饭</p>
                          <p><strong>晚餐:</strong> 烤三文鱼，蒸蔬菜</p>`;
        renderWorkoutCalendar(workoutPlan);
        renderDietRecommendation(dietPlan);
    };
});