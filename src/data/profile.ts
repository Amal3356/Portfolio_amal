// All site content lives here. Edit this file to update the portfolio.

export const profile = {
  name: "Amaldev A M",
  headline:
    "Software engineer for embedded and automotive systems. I write C and C++ for real-time work: RTOS, ROS and in-vehicle software.",
  email: "amaldev3356@gmail.com",
  linkedin: "https://linkedin.com/in/amaldevam",
  github: "", // e.g. "https://github.com/your-handle" (leave empty to hide the button)
  location: "Kerala, India",
};

export type Category = "Automotive systems" | "Real-time software" | "Web and apps";
export const categories: ("All" | Category)[] = [
  "All",
  "Automotive systems",
  "Real-time software",
  "Web and apps",
];

export interface Project {
  title: string;
  role: string;
  categories: Category[];
  points: string[];
  tags: string[];
  link?: string; // add a repo or demo URL to show a link
}

export const projects: Project[] = [
  {
    title: "Vision-LiDAR-IMU fusion for robust localization",
    role: "Developer",
    categories: ["Automotive systems", "Real-time software"],
    points: [
      "Built a localization framework for autonomous vehicles in GPS-degraded environments, tested in CARLA.",
      "Combined an RGB camera, 3D LiDAR and IMU using ORB-based visual odometry, IMU motion estimation and ICP scan registration.",
      "Used EKF-based pose estimation to reduce drift and steady the trajectory.",
      "Generated 3D LiDAR maps and visualized trajectories with Python and Open3D.",
      "Evaluated results with ATE, RPE and trajectory drift across driving scenarios.",
    ],
    tags: ["CARLA", "Python", "Open3D", "EKF", "ICP", "ORB"],
  },
  {
    title: "DepthVisionPro: object detection with monocular depth",
    role: "Developer",
    categories: ["Real-time software"],
    points: [
      "Built a real-time perception system that pairs YOLO11 object detection with DepthPro monocular depth estimation.",
      "YOLO11 handles multi-class detection on RGB images and video streams.",
    ],
    tags: ["YOLO11", "DepthPro", "Python"],
  },
  {
    title: "Driver drowsiness detection using CNN",
    role: "Developer",
    categories: ["Automotive systems", "Real-time software"],
    points: [
      "Trained a CNN in TensorFlow/Keras to classify drowsy and alert states from eye closure and yawning patterns.",
      "Collected and preprocessed real-time facial image data.",
      "Added a real-time alert with OpenCV that triggers visual and audio warnings.",
    ],
    tags: ["CNN", "TensorFlow", "Keras", "OpenCV"],
  },
  {
    title: "Scania: ML web app for pneumonia detection",
    role: "Front-end developer and data preprocessing",
    categories: ["Web and apps"],
    points: [
      "Built a responsive front end for the application.",
      "Cleaned and normalized datasets for model training.",
      "Implemented CNN and ResNet-50 models to improve detection accuracy.",
    ],
    tags: ["CNN", "ResNet-50", "Front end"],
  },
  {
    title: "CollabSphere: web app for a collaborative platform",
    role: "Front-end developer",
    categories: ["Web and apps"],
    points: [
      "Designed and built interface components in HTML, CSS and JavaScript.",
      "Gathered requirements with teammates and refined features after usability testing.",
    ],
    tags: ["HTML", "CSS", "JavaScript"],
  },
];

export interface Role {
  period: string;
  title: string;
  org: string;
  points: string[];
}

export const experience: Role[] = [
  {
    period: "April – present",
    title: "Developer Intern",
    org: "Acsia Technologies",
    points: [
      "Developed stitching algorithms for real-time video stitching.",
      "Worked on a surround-view system that covers blind-spot regions on heavy vehicles.",
      "Developed a project related to defense systems.",
    ],
  },
  {
    period: "May – July 2025",
    title: "TBU General Trainee",
    org: "Tata Elxsi",
    points: [
      "Assisted in building a perception module that combines sensor data for object detection and scene understanding.",
      "Contributed to path planning and worked with the team on smooth trajectory generation in static and dynamic driving scenarios.",
    ],
  },
];

export const education = [
  { period: "2024 – 2026", title: "M.Tech, Automotive Electronics", org: "Sree Chitra Thirunal College of Engineering, Pappanamcode" },
  { period: "2020 – 2024", title: "B.Tech, Computer Science and Engineering", org: "College of Engineering Attingal" },
];

export const skills: { group: string; items: string; lead?: boolean }[] = [
  { group: "Languages", items: "C, C++, Python, JavaScript, HTML, CSS", lead: true },
  { group: "Embedded and automotive", items: "RTOS, ROS, MicroC, ADAS, embedded systems", lead: true },
  { group: "Software engineering", items: "Data structures and algorithms, object-oriented programming, operating systems, software engineering, Git and GitHub" },
  { group: "Data and web", items: "MySQL, MongoDB, React" },
  { group: "Libraries and tools", items: "OpenCV, Open3D, TensorFlow/Keras, CARLA" },
];
