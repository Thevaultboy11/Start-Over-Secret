// pages/your-page.tsx
import React, { useState } from 'react';
import withAuth from '../components/withAuth';
import Head from 'next/head';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import {
  Box,
  Typography,
  Button,
  Paper,
  Chip,
  RadioGroup,
  FormControlLabel,
  Radio,
  Collapse,
  Grid
} from '@mui/material';
import { motion } from 'framer-motion';
const emotionalGymData = [
  {
    "category": "Triggers & Trauma",
    "icon": "🚨",
    "scenarios": [
      {
        "title": "You remember an intimate night that felt deeply special.",
        "text": "You’re lying in bed and suddenly remember the way he touched you, the way he looked at you like you were the only one. Your body remembers the closeness. It aches. You start questioning if any of it was real. What do you do?",
        "correct_answer": "Acknowledge the memory, then gently affirm: 'It was special, but it’s over.'",
        "correct_answer_option": 1,
        "options": [
          "Acknowledge the memory, then gently affirm: 'It was special, but it’s over.'",
          "Send him a message saying you miss him.",
          "Scroll through your old photos together.",
          "Blame yourself for losing the connection."
        ],
        "correct_answer_explanation": "Honoring the memory without clinging to it allows space for grief without self-destruction."
      },
      {
        "title": "You find one of his old t-shirts in your drawer.",
        "text": "You forgot it was there — but now it’s in your hands, and suddenly it smells like him. Your heart pounds. You feel like collapsing. Do you hold it, cry, text him?",
        "correct_answer": "Put it in a box of 'release items' and step outside for fresh air.",
        "correct_answer_option": 3,
        "options": [
          "Put it on and curl up with it.",
          "Text him and say you found it.",
          "Put it in a box of 'release items' and step outside for fresh air.",
          "Burn it immediately in anger."
        ],
        "correct_answer_explanation": "Creating physical distance from emotional anchors helps you reclaim control with compassion."
      },
      {
        "title": "You hear he’s sleeping with someone new.",
        "text": "A friend tells you he’s been casually hooking up with someone. Your stomach flips. You feel replaced, humiliated, and furious. You're tempted to text him or compare yourself to her. What now?",
        "correct_answer": "Feel the pain, then remind yourself: his choices don’t define your worth.",
        "correct_answer_option": 4,
        "options": [
          "Ask your friend for more details.",
          "DM him asking if it’s true.",
          "Stalk the new girl’s profile.",
          "Feel the pain, then remind yourself: his choices don’t define your worth."
        ],
        "correct_answer_explanation": "You can't control him, but you can honor your pain and protect your healing path."
      },
      {
        "title": "You’re craving the emotional safety you felt in his arms.",
        "text": "You’re overwhelmed after a bad day and all you want is to be held — like he used to. You feel so alone, you almost text him, just to feel that warmth again.",
        "correct_answer": "Wrap yourself in a blanket and speak softly to yourself: 'I’m here. I’ve got you.'",
        "correct_answer_option": 2,
        "options": [
          "Call him just to hear his voice.",
          "Wrap yourself in a blanket and speak softly to yourself: 'I’m here. I’ve got you.'",
          "Look at old photos and cry yourself to sleep.",
          "Ignore the feeling and go numb on your phone."
        ],
        "correct_answer_explanation": "Self-soothing activates the same comfort response and helps you build inner safety."
      },
      {
        "title": "You dreamt about your most passionate night together.",
        "text": "The dream felt real — your bodies, your laughter, the way he looked into your eyes. You wake up aching and confused. Is this a sign? Do you still want him?",
        "correct_answer": "Write down what the dream brought up and focus on what *you* need now.",
        "correct_answer_option": 1,
        "options": [
          "Write down what the dream brought up and focus on what *you* need now.",
          "Take it as a sign to call him.",
          "Masturbate to the memory and cry afterward.",
          "Delete all his pictures in a panic."
        ],
        "correct_answer_explanation": "Dreams stir emotion, but you have the power to choose how you relate to them."
      },
      {
        "title": "You feel triggered during intimacy with someone new.",
        "text": "Things were going well until he kissed your neck like your ex used to. Suddenly you freeze. You’re not present. You feel like you’re betraying yourself. What do you do?",
        "correct_answer": "Pause, breathe, and communicate that you need a moment.",
        "correct_answer_option": 3,
        "options": [
          "Pretend nothing’s wrong and keep going.",
          "Leave immediately without explanation.",
          "Pause, breathe, and communicate that you need a moment.",
          "Tell him you’re not over your ex mid-kiss."
        ],
        "correct_answer_explanation": "Consent includes your emotional state. Pausing honors your healing process and builds trust with yourself."
      },
      {
        "title": "You run into a place where you shared a loving memory.",
        "text": "You didn’t expect it, but you’re here — your old spot. The restaurant where he said he loved you. Suddenly you feel split between nostalgia and heartbreak.",
        "correct_answer": "Place your hand on your heart and whisper, 'That chapter is closed. I’m still whole.'",
        "correct_answer_option": 2,
        "options": [
          "Order your favorite meal and cry silently.",
          "Place your hand on your heart and whisper, 'That chapter is closed. I’m still whole.'",
          "Message him: 'Remember this place?'",
          "Rush out in tears, overwhelmed."
        ],
        "correct_answer_explanation": "Speaking to yourself kindly in those moments reclaims the narrative of who you are now."
      },
      {
        "title": "You see a photo of his hand on someone else's waist.",
        "text": "A mutual tagged photo flashes across your feed — he’s got his arm around someone new, smiling. Your chest clenches. You want to scream. What’s your next move?",
        "correct_answer": "Mute or unfollow triggers and move your body to release the emotion.",
        "correct_answer_option": 4,
        "options": [
          "Zoom in and analyze every detail.",
          "Screenshot it and send it to a friend.",
          "Cry and curse them both out loud.",
          "Mute or unfollow triggers and move your body to release the emotion."
        ],
        "correct_answer_explanation": "Protecting your peace is a boundary. Moving your body helps emotion flow instead of stagnate."
      },
      {
        "title": "You remember the way he used to study your body like art.",
        "text": "You miss being seen — the way he used to admire you, make you feel like a goddess. Now you feel invisible, undesired, even ashamed. What do you do?",
        "correct_answer": "Look in the mirror, light a candle, and adore yourself like a sacred ritual.",
        "correct_answer_option": 1,
        "options": [
          "Look in the mirror, light a candle, and adore yourself like a sacred ritual.",
          "Scroll through dating apps for validation.",
          "Text him: 'Do you still think I’m beautiful?'",
          "Avoid mirrors and cover up more."
        ],
        "correct_answer_explanation": "Your sensuality is your own. Reclaiming it without needing approval is powerful healing."
      },
      {
        "title": "You have a strong urge to revisit your 'best night' together.",
        "text": "It was perfect — the fireworks, the connection, the passion. You want to go there, even just mentally. But you know it might spiral into sadness. What do you choose?",
        "correct_answer": "Thank the memory for what it gave you, then gently shift focus to your present body.",
        "correct_answer_option": 2,
        "options": [
          "Rewatch videos from that night and cry.",
          "Thank the memory for what it gave you, then gently shift focus to your present body.",
          "Text him: 'Do you ever think about that night?'",
          "Drink wine and play 'your song' on repeat."
        ],
        "correct_answer_explanation": "Grief often hides inside beauty. Honoring the good without clinging allows it to become a chapter, not a trap."
      }
    ]
  },  
  {
    "category": "Cognitive Reframes",
    "icon": "🔄",
    "scenarios": [
      {
        "title": "You feel like you weren't 'enough' for him to stay.",
        "text": "You keep replaying your flaws. If you were prettier, calmer, or sexier — maybe he wouldn’t have left. The thought haunts you. What do you reframe?",
        "correct_answer": "You were always enough — he simply wasn’t capable of holding you.",
        "correct_answer_option": 1,
        "options": [
          "You were always enough — he simply wasn’t capable of holding you.",
          "Maybe next time I’ll be less intense.",
          "He left because I’m hard to love.",
          "I should’ve changed more to make it work."
        ],
        "correct_answer_explanation": "Your worth doesn’t shrink because someone lacked emotional maturity. You are still whole."
      },
      {
        "title": "You think your standards are 'too high.'",
        "text": "You’re told you expect too much — emotional maturity, effort, communication. You wonder if you should settle. What do you remind yourself?",
        "correct_answer": "Standards protect your softness — they aren’t obstacles, they’re filters.",
        "correct_answer_option": 2,
        "options": [
          "Lowering my expectations is the key to keeping love.",
          "Standards protect your softness — they aren’t obstacles, they’re filters.",
          "I should just focus on being more chill.",
          "No one is perfect. I should accept what I get."
        ],
        "correct_answer_explanation": "High standards don’t scare the right person — they guide them toward you."
      },
      {
        "title": "You feel ashamed for still loving him.",
        "text": "It’s been months. You feel embarrassed for still thinking about him, still aching. You start to believe you're weak. What do you reframe?",
        "correct_answer": "Loving deeply is not weakness — it’s divine feminine strength.",
        "correct_answer_option": 4,
        "options": [
          "I’m pathetic for not moving on.",
          "If I were stronger, I’d hate him by now.",
          "I’ll just fake confidence until it’s real.",
          "Loving deeply is not weakness — it’s divine feminine strength."
        ],
        "correct_answer_explanation": "Your love doesn’t expire with the relationship. It simply redirects — inward, now."
      },
      {
        "title": "You believe no one will ever love you the way he did.",
        "text": "You miss the intensity. The little gestures. The fire. Now you believe that kind of love only happens once. What’s the truth?",
        "correct_answer": "If love was that intense with the wrong person, imagine what’s possible with the right one.",
        "correct_answer_option": 3,
        "options": [
          "Maybe he really was my soulmate.",
          "I won’t find that magic again.",
          "If love was that intense with the wrong person, imagine what’s possible with the right one.",
          "It’s safer to stay single forever."
        ],
        "correct_answer_explanation": "Intensity isn’t the same as intimacy. Healthy love won’t burn you — it will nourish you."
      },
      {
        "title": "You feel disposable because he moved on fast.",
        "text": "He’s already with someone new. You wonder if you were ever special or just a phase. What do you reframe?",
        "correct_answer": "You’re not disposable — you’re unforgettable to those who truly see you.",
        "correct_answer_option": 1,
        "options": [
          "You’re not disposable — you’re unforgettable to those who truly see you.",
          "It must’ve been easy for him to forget me.",
          "I need to make myself more desirable next time.",
          "Love isn’t meant for people like me."
        ],
        "correct_answer_explanation": "People don’t always process their pain in healthy ways — that doesn’t define your value."
      },
      {
        "title": "You were told you're too much — too deep, too intense, too emotional.",
        "text": "His words echo: 'You overthink everything.' You start to shrink yourself. What do you remember?",
        "correct_answer": "My depth is a blessing — not everyone is meant to swim in it.",
        "correct_answer_option": 4,
        "options": [
          "I should talk less about how I feel.",
          "It’s my fault I push people away.",
          "Maybe I need to be more surface-level.",
          "My depth is a blessing — not everyone is meant to swim in it."
        ],
        "correct_answer_explanation": "Depth is intimidating to shallow hearts. Stay soft, stay deep, stay you."
      },
      {
        "title": "You feel like you lost your feminine glow.",
        "text": "The breakup drained you. You used to feel magnetic, sensual, radiant. Now you feel dull and unseen. How do you reframe this?",
        "correct_answer": "Your glow isn’t gone — it’s being reborn through your healing.",
        "correct_answer_option": 2,
        "options": [
          "I’ll never feel desirable again.",
          "Your glow isn’t gone — it’s being reborn through your healing.",
          "I need someone new to light me up.",
          "It’s over. My best days are behind me."
        ],
        "correct_answer_explanation": "True glow comes from inner alignment. Nurture your body, spirit, and sensuality — the radiance returns."
      },
      {
        "title": "You feel like you failed as a woman because the relationship ended.",
        "text": "You tried so hard to make it work — to support him, understand him, love him through it. And now, it’s over. You feel like you weren’t woman enough. What do you reframe?",
        "correct_answer": "You were never meant to carry what he refused to hold.",
        "correct_answer_option": 3,
        "options": [
          "I must’ve been too needy.",
          "I should’ve been more patient.",
          "You were never meant to carry what he refused to hold.",
          "I failed at being a good woman."
        ],
        "correct_answer_explanation": "You didn’t fail — you simply outgrew someone who chose stagnation over growth."
      },
      {
        "title": "You don’t recognize yourself anymore.",
        "text": "You lost your rituals. Your softness. Your sparkle. You’ve become someone who survives — not someone who blooms. What do you do?",
        "correct_answer": "Return to your feminine practices — slow mornings, warm baths, silk sheets, soft music.",
        "correct_answer_option": 1,
        "options": [
          "Return to your feminine practices — slow mornings, warm baths, silk sheets, soft music.",
          "Keep pretending until you feel better.",
          "Only healing when you find a new man.",
          "Keep busy and avoid the pain."
        ],
        "correct_answer_explanation": "Healing isn’t about becoming someone new — it’s about remembering who you are beneath the survival."
      },
      {
        "title": "You think femininity is weakness after heartbreak.",
        "text": "Being soft got you hurt. Being loyal got you abandoned. So now, you’re tempted to harden. What do you reframe?",
        "correct_answer": "Femininity isn’t weakness — it’s power rooted in love, not fear.",
        "correct_answer_option": 4,
        "options": [
          "I need to stop caring so much.",
          "Being a 'good woman' is pointless.",
          "Emotions make you lose.",
          "Femininity isn’t weakness — it’s power rooted in love, not fear."
        ],
        "correct_answer_explanation": "You don’t have to become cold to protect yourself. You just need better boundaries, not a bitter heart."
      }
    ]
  },  
  {
    "category": "Self-Worth & Identity",
    "icon": "💎",
    "scenarios": [
      {
        "title": "You think no man will truly see the real you.",
        "text": "You’ve always felt misunderstood. Like you had to dim yourself to be palatable. You wonder if anyone will actually value the woman you *really* are. What do you reframe?",
        "correct_answer": "The right man won’t just tolerate your truth — he’ll treasure it.",
        "correct_answer_option": 2,
        "options": [
          "Maybe I just need to keep certain parts of me hidden.",
          "The right man won’t just tolerate your truth — he’ll treasure it.",
          "I should become more low-maintenance to attract love.",
          "No one actually wants the full version of me."
        ],
        "correct_answer_explanation": "The person meant for you will not be afraid of your truth — they’ll be drawn to it."
      },
      {
        "title": "You feel like you're always the one doing the emotional labor.",
        "text": "In every relationship, you were the nurturer, the therapist, the fixer. Now you wonder if that’s just your role in love. What’s the shift?",
        "correct_answer": "You are not a rehabilitation center. You are a woman to be cherished, not healed by.",
        "correct_answer_option": 4,
        "options": [
          "Maybe I just attract broken men.",
          "It’s my job to love them through it.",
          "I must give more to prove my value.",
          "You are not a rehabilitation center. You are a woman to be cherished, not healed by."
        ],
        "correct_answer_explanation": "You are worthy of a partner who comes whole and ready to build, not drain you."
      },
      {
        "title": "You wonder if softness makes you less desirable.",
        "text": "In a world of hyper-independence, you fear your nurturing side will be taken for granted. You ask yourself: should I become colder to be respected?",
        "correct_answer": "Your softness is not a liability — it’s a luxury for the right man.",
        "correct_answer_option": 1,
        "options": [
          "Your softness is not a liability — it’s a luxury for the right man.",
          "I should stop being so kind.",
          "Maybe I should act more detached.",
          "Men only want the chase, not depth."
        ],
        "correct_answer_explanation": "Real masculinity feels safe around softness. You don’t have to harden to be taken seriously."
      },
      {
        "title": "You believe you have to earn love by being perfect.",
        "text": "You over-deliver, over-perform, over-give. Deep down, you’re afraid you won’t be loved unless you keep proving your worth. What do you reframe?",
        "correct_answer": "Love isn't something you earn — it’s something you receive by being.",
        "correct_answer_option": 3,
        "options": [
          "I need to keep showing why I deserve love.",
          "If I just improve a little more, I’ll be chosen.",
          "Love isn't something you earn — it’s something you receive by being.",
          "Perfection is the only way to be secure in a relationship."
        ],
        "correct_answer_explanation": "True intimacy begins when you believe you're enough — even in your messiest, most honest form."
      },
      {
        "title": "You fear being 'too independent' will scare good men away.",
        "text": "You’re successful, secure, and emotionally grounded. But sometimes you wonder: will this intimidate someone who’s supposed to lead and provide?",
        "correct_answer": "Your wholeness isn’t a threat — it’s an invitation to rise together.",
        "correct_answer_option": 2,
        "options": [
          "Maybe I should tone it down on the first date.",
          "Your wholeness isn’t a threat — it’s an invitation to rise together.",
          "Men want women who need saving.",
          "I need to hide my accomplishments for a while."
        ],
        "correct_answer_explanation": "Powerful men admire powerful women — not for competition, but for co-creation."
      },
      {
        "title": "You wonder if you're 'too much' to be someone's peace.",
        "text": "You’re passionate, expressive, and emotional. You’ve been told that you should be more 'chill' to keep a man. Should you shrink?",
        "correct_answer": "You are not too much — you’re exactly enough for someone who craves depth over peace and quiet.",
        "correct_answer_option": 1,
        "options": [
          "You are not too much — you’re exactly enough for someone who craves depth over peace and quiet.",
          "Men don’t want intense women.",
          "I should talk less and feel less.",
          "It’s easier to stay single and avoid burdening others."
        ],
        "correct_answer_explanation": "You're not here to be anyone’s emotional accessory. You’re here to build a real, soul-shaking love."
      },
      {
        "title": "You feel like you gave your body to someone who didn't deserve it.",
        "text": "Now that it’s over, you regret being vulnerable — emotionally and sexually. You feel ashamed. What do you reframe?",
        "correct_answer": "Your body isn’t something that can be 'used' — it’s something sacred that *you* chose to share.",
        "correct_answer_option": 3,
        "options": [
          "I should have waited longer to sleep with him.",
          "I was naive for opening up.",
          "Your body isn’t something that can be 'used' — it’s something sacred that *you* chose to share.",
          "He got what he wanted and left — I feel stupid."
        ],
        "correct_answer_explanation": "Your consent and presence made it sacred — his inability to honor that is not your shame to carry."
      },
      {
        "title": "You fear you won’t be valued because of your past.",
        "text": "You’ve made mistakes. You’ve stayed too long in toxic love. Now you wonder if a good man will think you’re 'damaged goods.'",
        "correct_answer": "Your past doesn’t diminish your worth — it deepens your wisdom.",
        "correct_answer_option": 4,
        "options": [
          "Maybe I’m too broken to be loved again.",
          "I have to hide certain things about my past.",
          "No high-quality man wants someone with baggage.",
          "Your past doesn’t diminish your worth — it deepens your wisdom."
        ],
        "correct_answer_explanation": "Wounded doesn’t mean unworthy — it means human. A healed man will see your story, not your scars."
      },
      {
        "title": "You think being 'chosen' means you finally made it.",
        "text": "All your life, you’ve associated your value with being picked — for the role, for the ring, for the title. You wonder if being single means you failed.",
        "correct_answer": "Being chosen by someone else means nothing if you haven’t chosen yourself first.",
        "correct_answer_option": 2,
        "options": [
          "I must not be lovable if no one commits to me.",
          "Being chosen by someone else means nothing if you haven’t chosen yourself first.",
          "If I fix myself, the right person will come.",
          "I should settle before it’s too late."
        ],
        "correct_answer_explanation": "Your identity isn't defined by external validation — but by inner embodiment of your worth."
      },
      {
        "title": "You feel like your beauty is your only value.",
        "text": "You’re praised for your looks. But deep down, you fear that if your appearance faded, love would disappear too. What’s the reframe?",
        "correct_answer": "Beauty draws attention. Depth creates devotion.",
        "correct_answer_option": 1,
        "options": [
          "Beauty draws attention. Depth creates devotion.",
          "If I stay fit and pretty, I’ll always be wanted.",
          "No one would stay if I stopped being attractive.",
          "My value drops as I age — that’s just reality."
        ],
        "correct_answer_explanation": "The right partner loves your presence — not your packaging. Your essence is timeless."
      }
    ]
  },  
  {
    "category": "Emotional Mastery",
    "icon": "🌀",
    "scenarios": [
      {
        "title": "You wake up with a heavy, anxious chest for no reason.",
        "text": "There’s no specific trigger, but your body feels tense and your mind races. You start blaming yourself for not being 'okay' all the time. What’s the reframe?",
        "correct_answer": "Not every emotion needs a reason — some just need space.",
        "correct_answer_option": 2,
        "options": [
          "I should snap out of this — there's nothing wrong.",
          "Not every emotion needs a reason — some just need space.",
          "I’m weak for feeling this way again.",
          "I need to overthink until I find the cause."
        ],
        "correct_answer_explanation": "The goal is not to fix the feeling, but to hold yourself through it."
      },
      {
        "title": "You feel overwhelmed by your to-do list and freeze.",
        "text": "You had so much planned, but now even brushing your teeth feels like a task. The guilt kicks in fast. What’s the best move?",
        "correct_answer": "Choose one small thing and honor it like it’s sacred.",
        "correct_answer_option": 3,
        "options": [
          "Push through everything until you crash.",
          "Scroll for an hour and avoid it all.",
          "Choose one small thing and honor it like it’s sacred.",
          "Beat yourself up for being lazy."
        ],
        "correct_answer_explanation": "Momentum is built through softness, not shame. Start small — that’s mastery."
      },
      {
        "title": "You feel insecure about how your body looks today.",
        "text": "You catch your reflection and spiral. You start nitpicking, comparing, hating. You don’t even want to be seen. What do you do?",
        "correct_answer": "Speak to your body like you would a friend: with softness, not judgment.",
        "correct_answer_option": 1,
        "options": [
          "Speak to your body like you would a friend: with softness, not judgment.",
          "Wear oversized clothes to hide everything.",
          "Skip the plans — you don’t feel good enough.",
          "Look at fitness pages to motivate yourself."
        ],
        "correct_answer_explanation": "Your body isn’t an object to fix — it’s a home to honor."
      },
      {
        "title": "You’re exhausted but feel bad for resting.",
        "text": "You’ve been productive all week. Yet now that you’re still, guilt whispers that you’re falling behind. How do you respond?",
        "correct_answer": "Rest is not a reward — it’s a right.",
        "correct_answer_option": 4,
        "options": [
          "Do something small so you feel less lazy.",
          "Keep pushing through the fatigue.",
          "Rest later once you’ve earned it.",
          "Rest is not a reward — it’s a right."
        ],
        "correct_answer_explanation": "Burnout is not a badge of honor. Resting now prevents collapsing later."
      },
      {
        "title": "You made a small mistake and can’t stop replaying it.",
        "text": "You forgot something minor. But now your brain is spiraling into 'I always mess up' and 'They’ll never trust me again.' What do you reframe?",
        "correct_answer": "A mistake doesn’t define your character — your response does.",
        "correct_answer_option": 3,
        "options": [
          "Hide and hope no one brings it up.",
          "Apologize profusely and overexplain.",
          "A mistake doesn’t define your character — your response does.",
          "Beat yourself up for being unreliable."
        ],
        "correct_answer_explanation": "Self-compassion builds resilience. Shame just keeps you stuck."
      },
      {
        "title": "You feel emotionally overstimulated in public.",
        "text": "The lights, noise, conversations — it’s all too much. Your skin feels tight. You want to run away or shut down. What helps?",
        "correct_answer": "Excuse yourself, breathe deeply, and place your hand over your heart.",
        "correct_answer_option": 1,
        "options": [
          "Excuse yourself, breathe deeply, and place your hand over your heart.",
          "Stay silent and suppress the overwhelm.",
          "Push through and act like nothing’s wrong.",
          "Start panicking and look for an exit."
        ],
        "correct_answer_explanation": "You are allowed to pause and soothe yourself — even in public."
      },
      {
        "title": "You feel like you're falling behind in life.",
        "text": "Everyone seems to be thriving. You feel like you're stuck, lost, or late to your purpose. What’s the shift?",
        "correct_answer": "There’s no timeline for healing or blooming — only your rhythm.",
        "correct_answer_option": 4,
        "options": [
          "Work harder until something clicks.",
          "Compare yourself to people your age.",
          "Scroll social media to feel motivated.",
          "There’s no timeline for healing or blooming — only your rhythm."
        ],
        "correct_answer_explanation": "You are not late. You are on your own path — trust the timing of your soul."
      },
      {
        "title": "You feel drained from constant people-pleasing.",
        "text": "You said yes when you meant no. Again. Now you’re exhausted and a little resentful. What do you reframe?",
        "correct_answer": "Saying no to them is saying yes to yourself.",
        "correct_answer_option": 2,
        "options": [
          "It’s easier to just keep everyone happy.",
          "Saying no to them is saying yes to yourself.",
          "I’ll just cancel at the last minute.",
          "I’m selfish for choosing myself."
        ],
        "correct_answer_explanation": "People-pleasing is self-abandonment in disguise. Real love includes boundaries."
      },
      {
        "title": "You feel emotionally numb but guilty for not being 'grateful.'",
        "text": "Everything looks fine on paper. But inside, you're flat. Disconnected. Then guilt hits: 'Why can’t I just be thankful?' What now?",
        "correct_answer": "Gratitude isn’t forced joy — it’s noticing truth without pressure.",
        "correct_answer_option": 3,
        "options": [
          "I should stop being ungrateful and snap out of it.",
          "Push it down and smile anyway.",
          "Gratitude isn’t forced joy — it’s noticing truth without pressure.",
          "Keep comparing yourself to people who have it worse."
        ],
        "correct_answer_explanation": "You’re allowed to feel disconnected. Gratitude flows better when you're honest, not when you fake it."
      },
      {
        "title": "You feel emotionally messy and unproductive.",
        "text": "You cried this morning. You journaled, felt your feelings, and sat with your triggers. But nothing 'got done.' You wonder if it was wasted time.",
        "correct_answer": "Emotional regulation *is* productivity — it builds the version of you who can hold more.",
        "correct_answer_option": 1,
        "options": [
          "Emotional regulation *is* productivity — it builds the version of you who can hold more.",
          "I should just stop being so sensitive.",
          "Push the feelings away and do something useful.",
          "Productivity matters more than healing."
        ],
        "correct_answer_explanation": "You’re not here to hustle through your emotions. You’re here to become emotionally sovereign."
      }
    ]
  }  
];
function EmotionalGym() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [selected, setSelected] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showFullText, setShowFullText] = useState(false);
  const [activeCategory, setActiveCategory] = useState(emotionalGymData[0].category);
  const [scenarioIndex, setScenarioIndex] = useState(0);

  const currentCategoryData = emotionalGymData.find(cat => cat.category === activeCategory);
  const currentScenario = currentCategoryData?.scenarios[scenarioIndex];

  const handleSubmit = () => {
    if (selected) setSubmitted(true);
  };

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setSelected('');
    setSubmitted(false);
    setShowFullText(false);
    setScenarioIndex(0);
  };

  const handleNext = () => {
    if (currentCategoryData && scenarioIndex < currentCategoryData.scenarios.length - 1) {
      setScenarioIndex(scenarioIndex + 1);
      setSelected('');
      setSubmitted(false);
      setShowFullText(false);
    }
  };

  const handlePrevious = () => {
    if (scenarioIndex > 0) {
      setScenarioIndex(scenarioIndex - 1);
      setSelected('');
      setSubmitted(false);
      setShowFullText(false);
    }
  };

  if (!currentScenario) return null;
  if (loading) return <div>Loading...</div>;   // while Firebase checks

  if (!user) {
    // extra safety; withAuth should already redirect
    if (typeof window !== 'undefined') router.push('/login');
    return null;
  }

  return (
    <>
      <Head>
        <title>Emotional Gym</title>
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://breakupaidkit.com/emotional-gym" />
      </Head>

      <Box p={2} pt={3}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Emotional Gym
      </Typography>

      {/* Category buttons */}
      <Grid container spacing={1} mb={2}>
        {emotionalGymData.map((cat) => (
          <Grid  size={{ xs: 6}} key={cat.category}>
            <Button
              variant={activeCategory === cat.category ? 'contained' : 'outlined'}
              fullWidth
              onClick={() => handleCategoryChange(cat.category)}
              sx={{
                textTransform: 'none',
                borderRadius: 2,
                color: 'white',
                borderColor: 'white',
                bgcolor: activeCategory === cat.category ? 'primary.main' : 'transparent',
              }}
            >
              {cat.category}
            </Button>
          </Grid>
        ))}
      </Grid>

      {/* Scenario Card */}
      <Paper sx={{
        border: '1px solid rgba(255, 255, 255, 0.3)',
        borderRadius: 2,
        backgroundColor: '#000',
        p: 2
      }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Chip
            label={`${currentCategoryData.icon} ${activeCategory}`}

            sx={{ fontSize: 12, color: 'white', bgcolor: 'rgba(255,255,255,0.08)' }}
          />
          <Typography fontSize={12} color="gray">
            Scenario {scenarioIndex + 1} of {currentCategoryData?.scenarios.length}
          </Typography>
        </Box>

        <Typography fontSize={16} fontWeight="bold" gutterBottom>
          {currentScenario.title}
        </Typography>

        <Typography fontSize={14} color="white">
          {showFullText ? currentScenario.text : currentScenario.text.slice(0, 140) + '...'}
          {!showFullText && (
            <Button size="small" onClick={() => setShowFullText(true)} sx={{ textTransform: 'none', ml: 1 }}>
              Load more
            </Button>
          )}
        </Typography>

        {!submitted && (
          <RadioGroup value={selected} onChange={(e) => setSelected(e.target.value)}>
            {currentScenario.options.map((opt, idx) => (
              <FormControlLabel
                key={idx}
                value={opt}
                control={<Radio />}
                label={<Typography fontSize={14}>{opt}</Typography>}
              />
            ))}
          </RadioGroup>
        )}

        {!submitted && (
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            sx={{ mt: 2, textTransform: 'none' }}
            disabled={!selected}
          >
            Submit Answer
          </Button>
        )}

        <Collapse in={submitted}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Typography mt={2} fontSize={14} color={selected === currentScenario.correct_answer ? 'green' : 'red'}>
              {selected === currentScenario.correct_answer
                ? 'Correct ✅'
                : `Incorrect ❌ — Your answer: “${selected}”`}
            </Typography>
            <Typography mt={1} fontSize={14}>
              {currentScenario.correct_answer_explanation}
            </Typography>
          </motion.div>
        </Collapse>

        {/* Navigation inside card */}
        <Box mt={3} display="flex" justifyContent="space-between">
          <Button
            variant="text"
            color="primary"
            sx={{ textTransform: 'none' }}
            disabled={scenarioIndex === 0}
            onClick={handlePrevious}
          >
            Previous
          </Button>
          <Button
            variant="text"
            color="primary"
            sx={{ textTransform: 'none' }}
            disabled={
              !currentCategoryData ||
              scenarioIndex === currentCategoryData.scenarios.length - 1
            }
            onClick={handleNext}
          >
            Next
          </Button>
        </Box>
      </Paper>
    </Box>
    </>
  );
}

export default withAuth(EmotionalGym);
