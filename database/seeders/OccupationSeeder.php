<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OccupationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('occupations')->truncate();
        DB::table('job_titles')->truncate();

        $occupations = [
            [
                'title_en' => 'Arts, culture, entertainment, and sports occupations',
                'title_jp' => '芸術、文化、レクリエーション、スポーツ',
                'job_titles' => [
                    ['title_jp' => 'アナウンサーおよびその他のパフォーマー', 'title_en' => 'Announcers and other performers'],
                    ['title_jp' => '運動選手、コーチ、審判、および関連職', 'title_en' => 'Athletes, coaches, referees and related occupations'],
                    ['title_jp' => 'クリエイティブおよびパフォーミングアーティスト', 'title_en' => 'Creative and performing artists'],
                    ['title_jp' => 'クリエイティブデザイナーおよび職人', 'title_en' => 'Creative designers and craftspersons'],
                    ['title_jp' => '図書館司書、アーキビスト、保存修復士、または学芸員', 'title_en' => 'Librarian, archivist, conservator or curator'],
                    ['title_jp' => '写真家、グラフィックアート技術者、映画や放送の技術職', 'title_en' => 'Photographers, graphic arts technicians, technical and coordinating occupations in motion pictures, broadcasting and the performing arts'],
                    ['title_jp' => '図書館、公文書館、博物館、美術館の技術職', 'title_en' => 'Technical occupations in libraries, public archives, museums and art galleries'],
                    ['title_jp' => '作家、翻訳者、およびコミュニケーション専門職', 'title_en' => 'Writing, translating and related communications professionals'],
                ],
            ],
            [
                'title_en' => 'Business, finance, and administration occupations',
                'title_jp' => '金融、管理',
                'job_titles' => [
                    ['title_jp' => '管理および規制関連の職業', 'title_en' => 'Administrative and regulatory occupations'],
                    ['title_jp' => '管理サービス監督者', 'title_en' => 'Administrative services supervisors'],
                    ['title_jp' => '監査人、会計士、投資専門家', 'title_en' => 'Auditors, accountants and investment professionals'],
                    ['title_jp' => '裁判所速記者、録音・記録管理技術者、統計職員', 'title_en' => 'Court reporters, transcriptionists, records management technicians and statistical officers'],
                    ['title_jp' => '金融、保険および関連業務の管理職', 'title_en' => 'Finance, insurance and related business administrative occupations'],
                    ['title_jp' => '金融、保険および関連業務のサポート職', 'title_en' => 'Financial, insurance and related administrative support workers'],
                    ['title_jp' => '一般事務職', 'title_en' => 'General office workers'],
                    ['title_jp' => '人事およびビジネスサービスの専門家', 'title_en' => 'Human resources and business service professionals'],
                    ['title_jp' => '図書館、文書管理、その他の事務員', 'title_en' => 'Library, correspondence and other clerks'],
                    ['title_jp' => '郵便およびメッセージ配送関連職', 'title_en' => 'Mail and message distribution occupations'],
                    ['title_jp' => '一般、法務および医療のオフィスアシスタント', 'title_en' => 'Office administrative assistants - general, legal and medical'],
                    ['title_jp' => 'オフィス機器オペレーター', 'title_en' => 'Office equipment operators'],
                    ['title_jp' => '物流、追跡およびスケジュール調整関連職', 'title_en' => 'Supply chain logistics, tracking and scheduling coordination occupations'],
                ],
            ],
            [
                'title_en' => 'Education, law, community, and government services occupations',
                'title_jp' => '教育、法律、社会福祉、地域・行政サービス  ',
                'job_titles' => [
                    [
                        'title_jp' => '大学およびその他の職業訓練の講師',
                        'title_en' => 'College and other vocational instructors',
                    ],
                    [
                        'title_jp' => 'ホームケア提供者および教育支援職',
                        'title_en' => 'Home care providers and educational support occupations',
                    ],
                    [
                        'title_jp' => '裁判官、弁護士、公証人',
                        'title_en' => 'Judges, lawyers, and notaries',
                    ],
                    [
                        'title_jp' => '法務および公共保護支援職',
                        'title_en' => 'Legal and public protection support occupations',
                    ],
                    [
                        'title_jp' => '公共保護サービスの第一線の職業',
                        'title_en' => 'Occupations in front-line public protection services',
                    ],
                    [
                        'title_jp' => '法務、社会、地域、教育サービスにおける準専門職',
                        'title_en' => 'Paraprofessional occupations in legal, social, community, and education services',
                    ],
                    [
                        'title_jp' => '政策およびプログラムの研究者、コンサルタント、担当者',
                        'title_en' => 'Policy and program researchers, consultants, and officers',
                    ],
                    [
                        'title_jp' => '中学校および小学校の教師、教育カウンセラー',
                        'title_en' => 'Secondary and elementary school teachers and educational counsellors',
                    ],
                    [
                        'title_jp' => '社会および地域サービスの専門職',
                        'title_en' => 'Social and community service professionals',
                    ],
                    [
                        'title_jp' => '大学教授および高等教育助手',
                        'title_en' => 'University professors and post-secondary assistants',
                    ],
                ],
            ],
            [
                'title_en' => 'Healthcare occupations',
                'title_jp' => '経営管理',
                'job_titles' => [
                    [
                        'title_jp' => '医療サービス支援の補助職',
                        'title_en' => 'Assisting occupations in support of health services',
                    ],
                    [
                        'title_jp' => '医療技術者および技師',
                        'title_en' => 'Medical technologists and technicians',
                    ],
                    [
                        'title_jp' => '検眼士、カイロプラクター、その他の医療診断および治療専門家',
                        'title_en' => 'Optometrists, chiropractors, other health diagnosing and treating professionals',
                    ],
                    [
                        'title_jp' => '医療分野のその他の技術職',
                        'title_en' => 'Other technical occupations in health care',
                    ],
                    [
                        'title_jp' => '薬剤師、栄養士および管理栄養士',
                        'title_en' => 'Pharmacists, dieticians and nutritionists',
                    ],
                    [
                        'title_jp' => '医師、歯科医および獣医',
                        'title_en' => 'Physicians, dentists and veterinarians',
                    ],
                    [
                        'title_jp' => '看護の専門職',
                        'title_en' => 'Professional occupations in nursing',
                    ],
                    [
                        'title_jp' => '歯科医療分野の技術職',
                        'title_en' => 'Technical occupations in dental health care',
                    ],
                    [
                        'title_jp' => '療法および評価の専門職',
                        'title_en' => 'Therapy and assessment professionals',
                    ],
                ],
            ],
            [
                'title_en' => 'Homemarket',
                'title_jp' => 'ホームマーケット',
                'job_titles' => [],
            ],
            [
                'title_en' => 'Management occupations',
                'title_jp' => '経営管理',
                'job_titles' => [
                    [
                        'title_jp' => '管理サービス管理者',
                        'title_en' => 'Administrative services managers',
                    ],
                    [
                        'title_jp' => '法人営業管理者',
                        'title_en' => 'Corporate sales managers',
                    ],
                    [
                        'title_jp' => '議員および政治職を含む上級管理者',
                        'title_en' => 'Legislators and senior management, including political officials',
                    ],
                    [
                        'title_jp' => '農業、園芸、水産業の管理者',
                        'title_en' => 'Managers in agriculture, horticulture and aquaculture',
                    ],
                    [
                        'title_jp' => '芸術、文化、レクリエーション、スポーツの管理者',
                        'title_en' => 'Managers in art, culture, recreation and sport',
                    ],
                    [
                        'title_jp' => 'コミュニケーション分野の管理者',
                        'title_en' => 'Managers in communication',
                    ],
                    [
                        'title_jp' => '建設、施設運営および保守の管理者',
                        'title_en' => 'Managers in construction, facility operation and maintenance',
                    ],
                    [
                        'title_jp' => '顧客サービスおよび個人サービスの管理者',
                        'title_en' => 'Managers in customer and personal services',
                    ],
                    [
                        'title_jp' => '教育、社会、地域サービスの管理者',
                        'title_en' => 'Managers in education and social and community services',
                    ],
                    [
                        'title_jp' => '工学、建築、科学、情報システムの管理者',
                        'title_en' => 'Managers in engineering, architecture, science and information systems',
                    ],
                    [
                        'title_jp' => '金融およびビジネスサービスの管理者',
                        'title_en' => 'Managers in financial and business services',
                    ],
                    [
                        'title_jp' => '飲食サービスおよび宿泊サービスの管理者',
                        'title_en' => 'Managers in food service and accommodation',
                    ],
                    [
                        'title_jp' => '医療分野の管理者',
                        'title_en' => 'Managers in health care',
                    ],
                    [
                        'title_jp' => '製造および公益事業の管理者',
                        'title_en' => 'Managers in manufacturing and utilities',
                    ],
                    [
                        'title_jp' => '天然資源生産および漁業の管理者',
                        'title_en' => 'Managers in natural resources production and fishing',
                    ],
                    [
                        'title_jp' => '公共行政の管理者',
                        'title_en' => 'Managers in public administration',
                    ],
                    [
                        'title_jp' => '公共保護サービスの管理者',
                        'title_en' => 'Managers in public protection services',
                    ],
                    [
                        'title_jp' => '輸送分野の管理者',
                        'title_en' => 'Managers in transportation',
                    ],
                    [
                        'title_jp' => '小売および卸売貿易の管理者',
                        'title_en' => 'Retail and wholesale trade managers',
                    ],
                ],
            ],
            [
                'title_en' => 'Manufacturing and utilities occupations',
                'title_jp' => '製造、公益事業（電気・ガス等）',
                'job_titles' => [
                    [
                        'title_jp' => '加工および製造における中央制御およびプロセスオペレーター',
                        'title_en' => 'Central control and process operators in processing and manufacturing',
                    ],
                    [
                        'title_jp' => '加工、製造および公共サービスにおける労働者',
                        'title_en' => 'Labourers in processing, manufacturing and utilities',
                    ],
                    [
                        'title_jp' => '化学、プラスチック、ゴム加工における機械オペレーターおよび関連職',
                        'title_en' => 'Machine operators and related workers in chemical, plastic and rubber processing',
                    ],
                    [
                        'title_jp' => '食品、飲料および関連製品加工における機械オペレーターおよび関連職',
                        'title_en' => 'Machine operators and related workers in food, beverage and associated products processing',
                    ],
                    [
                        'title_jp' => '鉱物および金属製品加工・製造における機械オペレーターおよび関連職',
                        'title_en' => 'Machine operators and related workers in mineral and metal products processing and manufacturing',
                    ],
                    [
                        'title_jp' => 'パルプ、紙生産および木材加工・製造における機械オペレーターおよび関連職',
                        'title_en' => 'Machine operators and related workers in pulp and paper production and wood processing and manufacturing',
                    ],
                    [
                        'title_jp' => '繊維、生地、毛皮および革製品加工・製造における機械オペレーターおよび関連職',
                        'title_en' => 'Machine operators and related workers in textile, fabric, fur and leather products processing and manufacturing',
                    ],
                    [
                        'title_jp' => '機械、電気および電子機器の組立工',
                        'title_en' => 'Mechanical, electrical and electronics assemblers',
                    ],
                    [
                        'title_jp' => 'その他の組立および関連職業',
                        'title_en' => 'Other assembly and related occupations',
                    ],
                    [
                        'title_jp' => '印刷機器オペレーターおよび関連職業',
                        'title_en' => 'Printing equipment operators and related occupations',
                    ],
                    [
                        'title_jp' => '組立および製造の監督者',
                        'title_en' => 'Supervisors in assembly and fabrication',
                    ],
                    [
                        'title_jp' => '加工および製造における職業の監督者',
                        'title_en' => 'Supervisors in processing and manufacturing occupations',
                    ],
                    [
                        'title_jp' => '公共サービス設備のオペレーターおよびコントローラー',
                        'title_en' => 'Utilities equipment operators and controllers',
                    ],
                ],
            ],
            [
                'title_en' => 'Military/Armed forces',
                'title_jp' => '軍事、防衛',
                'job_titles' => [
                    [
                        'title_jp' => '航空宇宙制御士官',
                        'title_en' => 'Aerospace Control Officer',
                    ],
                    [
                        'title_jp' => '航空宇宙制御オペレーター',
                        'title_en' => 'Aerospace Control Operator',
                    ],
                    [
                        'title_jp' => '航空宇宙工学士官',
                        'title_en' => 'Aerospace Engineering Officer',
                    ],
                    [
                        'title_jp' => '航空宇宙通信および情報システム技術者',
                        'title_en' => 'Aerospace Telecommunication and Information Systems Technician',
                    ],
                    [
                        'title_jp' => '航空戦闘システム士官',
                        'title_en' => 'Air Combat Systems Officer',
                    ],
                    [
                        'title_jp' => '航空機構造技術者',
                        'title_en' => 'Aircraft Structures Technician',
                    ],
                    [
                        'title_jp' => '装甲士官',
                        'title_en' => 'Armour Officer',
                    ],
                    [
                        'title_jp' => '装甲兵士',
                        'title_en' => 'Armoured Soldier',
                    ],
                    [
                        'title_jp' => '砲兵士官',
                        'title_en' => 'Artillery Officer',
                    ],
                    [
                        'title_jp' => '野戦砲兵兵士',
                        'title_en' => 'Artillery Soldier - Field',
                    ],
                    [
                        'title_jp' => '砲兵兵士 / 防空',
                        'title_en' => 'Artillery Soldier / Air Defence',
                    ],
                    [
                        'title_jp' => '航空システム技術者',
                        'title_en' => 'Aviation Systems Technician',
                    ],
                    [
                        'title_jp' => '航空電子システム技術者',
                        'title_en' => 'Avionics Systems Technician',
                    ],
                    [
                        'title_jp' => '生物医学電子技術者',
                        'title_en' => 'Biomedical Electronics Technologist',
                    ],
                    [
                        'title_jp' => '操舵士',
                        'title_en' => 'Boatswain',
                    ],
                    [
                        'title_jp' => '牧師',
                        'title_en' => 'Chaplain',
                    ],
                    [
                        'title_jp' => '戦闘工兵',
                        'title_en' => 'Combat Engineer',
                    ],
                    [
                        'title_jp' => '通信および電子工学（航空）士官',
                        'title_en' => 'Communications and Electronics Engineering (Air) Officer',
                    ],
                    [
                        'title_jp' => '通信研究オペレーター',
                        'title_en' => 'Communicator Research Operator',
                    ],
                    [
                        'title_jp' => '建設技術者',
                        'title_en' => 'Construction Technician',
                    ],
                    [
                        'title_jp' => '調理師',
                        'title_en' => 'Cook',
                    ],
                    [
                        'title_jp' => '歯科医士官',
                        'title_en' => 'Dental Officer',
                    ],
                    [
                        'title_jp' => '電気および機械工学士官',
                        'title_en' => 'Electrical and Mechanical Engineering Officer',
                    ],
                    [
                        'title_jp' => '電力配電技術者',
                        'title_en' => 'Electrical Distribution Technician',
                    ],
                    [
                        'title_jp' => '発電システム技術者',
                        'title_en' => 'Electrical Generating Systems Technician',
                    ],
                    [
                        'title_jp' => '工学士官',
                        'title_en' => 'Engineering Officer',
                    ],
                    [
                        'title_jp' => '消防士',
                        'title_en' => 'Fire Fighter',
                    ],
                    [
                        'title_jp' => '測地技術者',
                        'title_en' => 'Geomatics Technician',
                    ],
                    [
                        'title_jp' => '医療管理士官',
                        'title_en' => 'Health Care Administration Officer',
                    ],
                    [
                        'title_jp' => '画像技術者',
                        'title_en' => 'Imagery Technician',
                    ],
                    [
                        'title_jp' => '歩兵士官',
                        'title_en' => 'Infantry Officer',
                    ],
                    [
                        'title_jp' => '歩兵兵士',
                        'title_en' => 'Infantry Soldier',
                    ],
                    [
                        'title_jp' => '情報士官（海軍予備）',
                        'title_en' => 'Intelligence Officer, Naval Reserve',
                    ],
                    [
                        'title_jp' => '情報オペレーター',
                        'title_en' => 'Intelligence Operator',
                    ],
                    [
                        'title_jp' => '陸上通信および情報システム技術者',
                        'title_en' => 'Land Communications and Information Systems Technician',
                    ],
                    [
                        'title_jp' => '法務士官',
                        'title_en' => 'Legal Officer',
                    ],
                    [
                        'title_jp' => '電線技術者',
                        'title_en' => 'Line Technician',
                    ],
                    [
                        'title_jp' => '物流（支援）海軍予備士官',
                        'title_en' => 'Logistics (Support), Naval Reserve Officer',
                    ],
                    [
                        'title_jp' => '物流士官',
                        'title_en' => 'Logistics Officer',
                    ],
                    [
                        'title_jp' => '海上および潜水士官',
                        'title_en' => 'Maritime Surface and Sub-surface Officer',
                    ],
                    [
                        'title_jp' => '医療士官',
                        'title_en' => 'Medical Officer',
                    ],
                    [
                        'title_jp' => '医療技術者',
                        'title_en' => 'Medical Technician',
                    ],
                    [
                        'title_jp' => '軍警察',
                        'title_en' => 'Military Police',
                    ],
                    [
                        'title_jp' => '軍警察士官',
                        'title_en' => 'Military Police Officer',
                    ],
                    [
                        'title_jp' => '移動支援機器オペレーター',
                        'title_en' => 'Mobile Support Equipment Operator',
                    ],
                    [
                        'title_jp' => '音楽家',
                        'title_en' => 'Musician',
                    ],
                    [
                        'title_jp' => '海軍戦闘情報オペレーター',
                        'title_en' => 'Naval Combat Information Operator',
                    ],
                    [
                        'title_jp' => '海軍通信士',
                        'title_en' => 'Naval Communicator',
                    ],
                    [
                        'title_jp' => '看護士官',
                        'title_en' => 'Nursing Officer',
                    ],
                    [
                        'title_jp' => '人事選抜士官',
                        'title_en' => 'Personnel Selection Officer',
                    ],
                    [
                        'title_jp' => '薬剤士官',
                        'title_en' => 'Pharmacy Officer',
                    ],
                    [
                        'title_jp' => 'パイロット',
                        'title_en' => 'Pilot',
                    ],
                    [
                        'title_jp' => '配管および暖房技術者',
                        'title_en' => 'Plumbing and Heating Technician',
                    ],
                    [
                        'title_jp' => '港湾検査潜水士',
                        'title_en' => 'Port Inspection Diver',
                    ],
                    [
                        'title_jp' => '広報士官',
                        'title_en' => 'Public Affairs Officer',
                    ],
                    [
                        'title_jp' => '冷凍および機械システム技術者',
                        'title_en' => 'Refrigeration and Mechanical Systems Technician',
                    ],
                    [
                        'title_jp' => '資源管理支援クラーク（空軍予備）',
                        'title_en' => 'Resource Management Support Clerk, Air Reserve',
                    ],
                    [
                        'title_jp' => '資源管理支援クラーク（陸軍予備）',
                        'title_en' => 'Resource Management Support Clerk, Army Reserve',
                    ],
                    [
                        'title_jp' => '資源管理支援クラーク（海軍予備）',
                        'title_en' => 'Resource Management Support Clerk, Naval Reserve',
                    ],
                    [
                        'title_jp' => '信号オペレーター',
                        'title_en' => 'Signal Operator',
                    ],
                    [
                        'title_jp' => '信号（士官）',
                        'title_en' => 'Signals (Officer)',
                    ],
                    [
                        'title_jp' => '補給技術者（空軍予備）',
                        'title_en' => 'Supply Technician, Air Reserve',
                    ],
                    [
                        'title_jp' => '補給技術者（陸軍予備）',
                        'title_en' => 'Supply Technician, Army Reserve',
                    ],
                    [
                        'title_jp' => '補給技術者（海軍予備）',
                        'title_en' => 'Supply Technician, Naval Reserve',
                    ],
                    [
                        'title_jp' => '交通技術者',
                        'title_en' => 'Traffic Technician',
                    ],
                    [
                        'title_jp' => '車両技術者（陸軍予備）',
                        'title_en' => 'Vehicle Technician, Army Reserve',
                    ],
                    [
                        'title_jp' => '水、燃料および環境技術者',
                        'title_en' => 'Water, Fuels and Environmental Technician',
                    ],
                    [
                        'title_jp' => '武器技術者 / 陸上',
                        'title_en' => 'Weapons Technician / Land',
                    ],
                ],
            ],
            [
                'title_en' => 'Natural sciences, applied sciences, and related fields',
                'title_jp' => '自然、応用科学関連',
                'job_titles' => [
                    [
                        'title_jp' => '建築家、都市計画家、土地測量士',
                        'title_en' => 'Architects, urban planners and land surveyors',
                    ],
                    [
                        'title_jp' => '土木、機械、電気、化学エンジニア',
                        'title_en' => 'Civil, mechanical, electrical and chemical engineers',
                    ],
                    [
                        'title_jp' => 'コンピューターおよび情報システムの専門家',
                        'title_en' => 'Computer and information systems professionals',
                    ],
                    [
                        'title_jp' => '生命科学の専門家',
                        'title_en' => 'Life science professionals',
                    ],
                    [
                        'title_jp' => '数学者、統計学者、アクチュアリー',
                        'title_en' => 'Mathematicians, statisticians and actuaries',
                    ],
                    [
                        'title_jp' => 'その他のエンジニア',
                        'title_en' => 'Other engineers',
                    ],
                    [
                        'title_jp' => 'その他の技術検査官および規制担当者',
                        'title_en' => 'Other technical inspectors and regulatory officers',
                    ],
                    [
                        'title_jp' => '物理科学の専門家',
                        'title_en' => 'Physical science professionals',
                    ],
                    [
                        'title_jp' => '建築、製図、測量、測地学、気象学の技術職',
                        'title_en' => 'Technical occupations in architecture, drafting, surveying, geomatics and meteorology',
                    ],
                    [
                        'title_jp' => '土木、機械、産業工学の技術職',
                        'title_en' => 'Technical occupations in civil, mechanical and industrial engineering',
                    ],
                    [
                        'title_jp' => 'コンピューターおよび情報システムの技術職',
                        'title_en' => 'Technical occupations in computer and information systems',
                    ],
                    [
                        'title_jp' => '電子工学および電気工学の技術職',
                        'title_en' => 'Technical occupations in electronics and electrical engineering',
                    ],
                    [
                        'title_jp' => '生命科学の技術職',
                        'title_en' => 'Technical occupations in life sciences',
                    ],
                    [
                        'title_jp' => '物理科学の技術職',
                        'title_en' => 'Technical occupations in physical science',
                    ],
                    [
                        'title_jp' => '輸送士官およびコントローラー',
                        'title_en' => 'Transportation officers and controllers',
                    ],
                ],
            ],
            [
                // 9
                'title_en' => 'Natural resources, agriculture, and related industries',
                'title_jp' => '天然資源、農業および関連生産業',
                'job_titles' => [
                    [
                        'title_jp' => '農業および園芸労働者',
                        'title_en' => 'Agriculture and horticulture workers',
                    ],
                    [
                        'title_jp' => '農業、園芸および関連業務とサービスの請負業者および監督者',
                        'title_en' => 'Contractors and supervisors in agriculture, horticulture and related operations and services',
                    ],
                    [
                        'title_jp' => '鉱業、石油およびガスの請負業者および監督者',
                        'title_en' => 'Contractors and supervisors in mining, oil and gas',
                    ],
                    [
                        'title_jp' => '漁船の船長および漁師/漁婦',
                        'title_en' => 'Fishing vessel masters and fishermen/fisherwomen',
                    ],
                    [
                        'title_jp' => '収穫、造園および天然資源の労働者',
                        'title_en' => 'Harvesting, landscaping and natural resources labourers',
                    ],
                    [
                        'title_jp' => '伐採および林業労働者',
                        'title_en' => 'Logging and forestry workers',
                    ],
                    [
                        'title_jp' => '伐採機械オペレーター',
                        'title_en' => 'Logging machinery operators',
                    ],
                    [
                        'title_jp' => '鉱山サービス労働者および石油・ガス掘削のオペレーター',
                        'title_en' => 'Mine service workers and operators in oil and gas drilling',
                    ],
                    [
                        'title_jp' => '漁業、罠猟および狩猟のその他の労働者',
                        'title_en' => 'Other workers in fishing and trapping and hunting occupations',
                    ],
                    [
                        'title_jp' => '伐採および林業の監督者',
                        'title_en' => 'Supervisors, logging and forestry',
                    ],
                    [
                        'title_jp' => '地下鉱夫、石油およびガス掘削工および関連職業',
                        'title_en' => 'Underground miners, oil and gas drillers and related occupations',
                    ],
                ],
            ],
            [
                'title_en' => 'Retired',
                'title_jp' => '退職した',
                'job_titles' => [],
            ],
            [
                // 10
                'title_en' => 'Sales and customer service',
                'title_jp' => '営業・販売、サービス',
                'job_titles' => [
                    [
                        'title_jp' => '精肉業者およびパン職人',
                        'title_en' => 'Butchers and bakers',
                    ],
                    [
                        'title_jp' => 'レジ係',
                        'title_en' => 'Cashiers',
                    ],
                    [
                        'title_jp' => 'シェフおよび料理人',
                        'title_en' => 'Chefs and cooks',
                    ],
                    [
                        'title_jp' => '清掃員',
                        'title_en' => 'Cleaners',
                    ],
                    [
                        'title_jp' => 'カスタマーおよび情報サービス担当者',
                        'title_en' => 'Customer and information services representatives',
                    ],
                    [
                        'title_jp' => 'フードカウンター係、キッチン補助員および関連のサポート職',
                        'title_en' => 'Food counter attendants, kitchen helpers and related support occupations',
                    ],
                    [
                        'title_jp' => '保険、不動産および金融販売職',
                        'title_en' => 'Insurance, real estate and financial sales occupations',
                    ],
                    [
                        'title_jp' => '飲食サービス関連の職業',
                        'title_en' => 'Occupations in food and beverage services',
                    ],
                    [
                        'title_jp' => '旅行および宿泊関連の職業',
                        'title_en' => 'Occupations in travel and accommodation',
                    ],
                    [
                        'title_jp' => 'その他の個人サービス関連職',
                        'title_en' => 'Other occupations in personal services',
                    ],
                    [
                        'title_jp' => 'その他の販売サポートおよび関連職',
                        'title_en' => 'Other sales support and related occupations',
                    ],
                    [
                        'title_jp' => 'その他のサービスサポートおよび関連職',
                        'title_en' => 'Other service support and related occupations',
                    ],
                    [
                        'title_jp' => '小売販売スーパーバイザー',
                        'title_en' => 'Retail sales supervisors',
                    ],
                    [
                        'title_jp' => '小売販売員',
                        'title_en' => 'Retail salespersons',
                    ],
                    [
                        'title_jp' => '販売およびアカウント担当者',
                        'title_en' => 'Sales and account representatives',
                    ],
                    [
                        'title_jp' => '警備員および関連する警備サービス職',
                        'title_en' => 'Security guards and related security service occupations',
                    ],
                    [
                        'title_jp' => 'サービススーパーバイザー',
                        'title_en' => 'Service supervisors',
                    ],
                    [
                        'title_jp' => '個人および顧客サービスの専門職',
                        'title_en' => 'Specialized occupations in personal and customer services',
                    ],
                    [
                        'title_jp' => '宿泊、旅行および娯楽サービスのサポート職',
                        'title_en' => 'Support occupations in accommodation, travel and amusement services',
                    ],
                    [
                        'title_jp' => '卸売業および小売業の技術営業スペシャリストおよびバイヤー',
                        'title_en' => 'Technical sales specialists in wholesale trade and retail and wholesale buyers',
                    ],
                    [
                        'title_jp' => '観光および娯楽サービス職',
                        'title_en' => 'Tourism and amusement services occupations',
                    ],
                ],
            ],
            [
                'title_en' => 'Student',
                'title_jp' => '学生',
                'job_titles' => [],
            ],
            [
                'title_en' => 'Trades, transportation, and equipment operation',
                'title_jp' => '技能（例：電気技師、配管工、大工）、交通、機械機器操作関連 ',
                'job_titles' => [
                    [
                        'title_jp' => '自動車整備士',
                        'title_en' => 'Automotive service technicians',
                    ],
                    [
                        'title_jp' => '大工およびキャビネット職人',
                        'title_en' => 'Carpenters and cabinetmakers',
                    ],
                    [
                        'title_jp' => '工業、電気、建設業および関連作業の請負業者および監督者',
                        'title_en' => 'Contractors and supervisors in industrial, electrical and construction trades and related workers',
                    ],
                    [
                        'title_jp' => 'メンテナンストレードおよび重機・輸送機器オペレーターの請負業者および監督者',
                        'title_en' => 'Contractors and supervisors in maintenance trades and heavy equipment and transport operators',
                    ],
                    [
                        'title_jp' => 'クレーンオペレーター、掘削機オペレーターおよび爆破作業者',
                        'title_en' => 'Crane operators, drillers and blasters',
                    ],
                    [
                        'title_jp' => '電気作業および電力線、通信工事作業者',
                        'title_en' => 'Electrical trades and electrical power line and telecommunications workers',
                    ],
                    [
                        'title_jp' => '重機オペレーター',
                        'title_en' => 'Heavy equipment operators',
                    ],
                    [
                        'title_jp' => '長崎作業者および資材取り扱い作業者',
                        'title_en' => 'Longshore workers and material handlers',
                    ],
                    [
                        'title_jp' => '機械および輸送機器メカニック',
                        'title_en' => 'Machinery and transportation equipment mechanics',
                    ],
                    [
                        'title_jp' => '機械加工、金属成形、成形および設置作業',
                        'title_en' => 'Machining, metal forming, shaping and erecting trades',
                    ],
                    [
                        'title_jp' => '石工およびプラスター作業',
                        'title_en' => 'Masonry and plastering trades',
                    ],
                    [
                        'title_jp' => '自動車および公共交通機関運転手',
                        'title_en' => 'Motor vehicle and transit drivers',
                    ],
                    [
                        'title_jp' => 'その他の建設業作業員',
                        'title_en' => 'Other construction trades',
                    ],
                    [
                        'title_jp' => 'その他の取り付け業者、修理工およびサービス提供者',
                        'title_en' => 'Other installers, repairers and servicers',
                    ],
                    [
                        'title_jp' => 'その他の機械工および関連修理者',
                        'title_en' => 'Other mechanics and related repairers',
                    ],
                    [
                        'title_jp' => 'その他の輸送機器オペレーターおよび関連のメンテナンス作業者',
                        'title_en' => 'Other transport equipment operators and related maintenance workers',
                    ],
                    [
                        'title_jp' => '配管工、パイプフィッターおよびガスフィッター',
                        'title_en' => 'Plumbers, pipefitters and gas fitters',
                    ],
                    [
                        'title_jp' => '印刷機オペレーターおよびその他の作業および関連職',
                        'title_en' => 'Printing press operators, other trades and related occupations',
                    ],
                    [
                        'title_jp' => '公共事業およびその他の労働者',
                        'title_en' => 'Public works and other labourers',
                    ],
                    [
                        'title_jp' => '作業助手および労働者',
                        'title_en' => 'Trades helpers and labourers',
                    ],
                    [
                        'title_jp' => '鉄道運転員関連職',
                        'title_en' => 'Train crew operating occupations',
                    ],
                ],
            ],
            [
                'title_en' => 'Unemployed',
                'title_jp' => '失業中',
                'job_titles' => [],
            ],
        ];

        foreach ($occupations as $occupationIndex => $occupation) {
            $occupationId = DB::table('occupations')->insertGetId([
                'title_en' => $occupation['title_en'],
                'title_jp' => $occupation['title_jp'],
                'value' => $occupationIndex,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);

            if (! empty($occupation['job_titles'])) {
                foreach ($occupation['job_titles'] as $jobIndex => $jobTitle) {
                    DB::table('job_titles')->insert([
                        'occupation_id' => $occupationId,
                        'title_en' => $jobTitle['title_en'],
                        'title_jp' => $jobTitle['title_jp'],
                        'value' => $jobIndex,
                        'created_at' => Carbon::now(),
                        'updated_at' => Carbon::now(),
                    ]);
                }
            }
        }
    }
}
