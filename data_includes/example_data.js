////// EXPERIMENT FOR HW AJT 2020
///// Implements 7 points acceptability judgment scale.

///// Definition of the shuffleSequence; this defines the order of trials in the experiment
///// Order in this experiment is 1) Update the Latin Square counter, 2) Present instructions,
///// 3) Present practice, and 4) Present all fillers and target items shuffled together (pseudorandom)

var showProgressBar = false;                                 /// Turns off the progress bar.

var shuffleSequence = seq( "setcounter",             /// These lines are the main shuffle sequence.
  "intro",
  "prepractice",
  "practice",
  "getready",
  sepWith("sep", rshuffle(startsWith("Neg"), startsWith("Ma"), startsWith("F"))),
  "hiddenCompletionCode")

var defaults = [
    "Separator", {
        transfer: 1000,                                      // How long between sentences? (ms)
        normalMessage: "请等候下一个句子"  // What is message presented between stims? Can be blank.
    },
    "AcceptabilityJudgment", {
        as: ["1", "2", "3", "4", "5", "6", "7"],            /// What are options on Likert scale? Define both # of options and their labels.
        presentAsScale: true,                               /// Should it be presented as a scale? 'true' or 'false'
        instructions: "鼠标点击对应数字或按键盘上的1-7来回答",    /// Brief instructions present on each trial
        leftComment: "(非常不自然)", rightComment: "(非常自然)"        /// Labels on end-points of scale
    }
];

// Definitions of main variables; code from Roger Levy / Computational Psycholinguistics Lab @ MIT
// This code is lab standard, and it defines a random number that will be presented to participants
// along with the final notification that the experiment has finished.
// NOTE: Unless you specifically trigger the 'hiddenCompletionCode' event in the shuffleSequence
// there will be no record of an individual participant's randomnumber
var randomnumber=Math.floor(Math.random()*10000000001);
var completionCode=String("LIR" + randomnumber);
var sendingResultsMessage = "正在保存您的回答，请稍等";
var completionMessage = "您的回答已成功保存，感谢您的参与" ;
var completionErrorMessage = "保存失败，实验人员将为您提供帮助" ;



var items = [
    //// Define separator event
    ["sep", "Separator", { }],

    //// Define counter-incrementing event
    
 ["setcounter", "__SetCounter__", { }],
    //// Introduction screens
    ["intro", "Form", {
        html: { include: "example_intro.html" },
        validators: {
            age: function (s) { if (s.match(/^\d+$/)) return true; else return "Bad value for \u2018age\u2019"; }
        }
    } ],

    ["prepractice", Message, {consentRequired: false,
                    html: ["div",
                          ["p", "让我们试着练习五个句子。"]
                          ]}],

    ["practice", "AcceptabilityJudgment", {s: "小张喜欢和朋友去电影院。"}],
     ["practice", "AcceptabilityJudgment", {s: "小王作业写。"}],

     ["practice", "AcceptabilityJudgment", {s: "小明没吃了饭。"}],

     ["practice", "AcceptabilityJudgment", {s: "小红的汉语很不差"}],
    ["practice", "AcceptabilityJudgment", {s: "小新很爱看电视。"}],



    ["getready", Message, {consentRequired: false,
                    html: ["div",
                          ["p", "我们要开始了！请立即关闭您的手机，排除其他干扰事项，准备开始实验。"]
                          ]}],

    //// Item sets are grouped together
    //// Latin squaring is done automatically
    
    [["Neg.A",1], "AcceptabilityJudgment", {s: "昨天你没问谁就用了电脑。"}],
    
   
    [["Neg.A",2], "AcceptabilityJudgment", {s: "小张喝了三杯啤酒。"}],
   
    

    [["Neg.A",3], "AcceptabilityJudgment", {s: "昨天你没请谁就喝了红酒。"}],
   
    

    [["Neg.A",4], "AcceptabilityJudgment", {s: "三个老师们在教室里说话。"}],
   
    
    
    [["Neg.A",5], "AcceptabilityJudgment", {s: "昨天你没带什么就来了学校。"}],
    
    
    [["Neg.A",6], "AcceptabilityJudgment", {s: "昨天你没说什么就去了中国。"}],
   
    
    [["Ma.A",7], "AcceptabilityJudgment", {s: "小张购买了辆汽车。"}],
   
   
    [["Ma.A",8], "AcceptabilityJudgment", {s: "小王：你去吃什么吗？小李： 是啊。"}],
   
    

    [["Ma.A",9], "AcceptabilityJudgment", {s: "桌子上有三大台电脑。"}],
   
    

    [["Ma.A",10], "AcceptabilityJudgment", {s: "妈妈：你在听什么吗？小美：对啊。"}],
    
    
    [["Ma.A",11], "AcceptabilityJudgment", {s: "桌子上有两中杯绿茶。"}],
   
    
    
    [["Ma.A",12], "AcceptabilityJudgment", {s: "小美：你去看谁吗？小李：对啊。"}],
    

    ["hiddenCompletionCode", "FlashSentence", {s: String(completionCode), timeout: 1, sentenceDescType: "literal"}]


    ]

