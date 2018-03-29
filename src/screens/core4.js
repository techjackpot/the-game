import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  AppState,
} from 'react-native';
import {BoxShadow} from 'react-native-shadow';
import Svg,{
    Circle,
    Ellipse,
    G,
    LinearGradient,
    RadialGradient,
    Line,
    Path,
    Polygon,
    Polyline,
    Rect,
    Symbol,
    Use,
    Defs,
    Stop
} from 'react-native-svg';
import moment from 'moment';

import { core4 as styles, global as gstyles } from '../stylesheets';

import { getCore4Data, updateCore4Data } from '../actions/core4';

const elitesAssets = {
  fitness: {
    background: require('../assets/images/core4/fitness.jpg'),
    icon: require('../assets/images/core4/icons/body.png')
  },
  fuel: {
    background: require('../assets/images/core4/fuel.jpg'),
    icon: require('../assets/images/core4/icons/body.png')
  },
  meditation: {
    background: require('../assets/images/core4/meditation.jpg'),
    icon: require('../assets/images/core4/icons/being.png')
  },
  memoirs: {
    background: require('../assets/images/core4/memoirs.jpg'),
    icon: require('../assets/images/core4/icons/being.png')
  },
  partner: {
    background: require('../assets/images/core4/partner.jpg'),
    icon: require('../assets/images/core4/icons/balance.png')
  },
  posterity: {
    background: require('../assets/images/core4/posterity.jpg'),
    icon: require('../assets/images/core4/icons/balance.png')
  },
  discover: {
    background: require('../assets/images/core4/discover.jpg'),
    icon: require('../assets/images/core4/icons/business.png')
  },
  declare: {
    background: require('../assets/images/core4/declare.jpg'),
    icon: require('../assets/images/core4/icons/business.png')
  },
};

class Core4Elites extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  toggleStatus(taskGroup, task) {
    const {core4} = this.props;
    const data = {tasks: {}};
    data.tasks[taskGroup] = {};
    data.tasks[taskGroup][task] = !core4.tasks[taskGroup][task];
    data.completedTasks = core4.completedTasks + 0.5 * (!core4.tasks[taskGroup][task]?1:-1);
    this.props.updateCore4Data(
      {
        weekId: core4.weekId,
        dayId: core4.dayId,
      },
      data
    );
  }

  render() {
    const {core4, challenge} = this.props;
    const {tasks} = core4;
    const {outcomes} = challenge;
    return (
      <View style={[gstyles.container, styles.elitesContainer, gstyles.flexRow]}>
        {
          Object.entries(tasks).map(([taskGroup, subtasks]) => 
            Object.entries(subtasks).map(([task, done]) => 
              <BoxShadow key={task}  setting={{
                  width: 155,
                  height: 50,
                  color: '#1caceb',
                  border: 8,
                  radius: 10,
                  opacity: done === true ? 0.3 : 0,
                  x: 0,
                  y: 7,
                  style: {marginVertical: 7}
              }}>
                <TouchableOpacity activeOpacity={0.9} style={styles.eliteContainer} key={task} onPress={() => this.toggleStatus(taskGroup, task)}>
                  <View style={[gstyles.container, done === true ? styles.eliteActive : {}]}>
                    <View style={[gstyles.container, gstyles.flexRow, styles.eliteBackground]}>
                      <View style={styles.backgroundWhiteSpace}></View>
                      <Image style={styles.eliteBackgroudImage} resizeMode={'cover'} source={outcomes && outcomes[task] && outcomes[task].image && {uri: outcomes[task].image} || elitesAssets[task].background} />
                    </View>
                    <View style={[gstyles.container, styles.eliteCategoryContainer, done === false ? styles.eliteInactive : {}]}>
                      <View style={[gstyles.container, styles.eliteCategory]}>
                        <Image style={styles.eliteCategoryIcon} resizeMode={'contain'} source={elitesAssets[task].icon} />
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
            </BoxShadow>
            )
          )
        }
      </View>
    );
  }
}

class Core4Dude extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      offset: props.score / props.max,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.score !== nextProps.score) {
      const {score, max} = nextProps;
      const {offset} = this.state;
      let newOffset = score / max;
      let itr = 0;
      let timer = setInterval(() => {
        itr ++;
        this.setState({offset: offset + itr*(newOffset-offset)/10})
        if (itr >=10) clearInterval(timer);
      }, 20);
    }
  }
  render() {
    const {offset} = this.state;
    let type = offset===1 ? 'url(#full-gradient)' : 'url(#gradient)';
    return (
      <View style={[gstyles.container, styles.dudeContainer]}>
        <Svg width="150" height="150" viewBox="0 0 900 1236" preserveAspectRatio="xMidYMid">
          <Defs>
            <LinearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0" stopColor="#039BE5"></Stop>
              <Stop offset={offset+''} stopColor="#039BE5"></Stop>
              <Stop offset={offset+''} stopColor="#BDBDBD"></Stop>
              <Stop offset="1" stopColor="#BDBDBD"></Stop>
            </LinearGradient>
            <LinearGradient id="full-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0.1" stopColor="#00BCD4"></Stop>
              <Stop offset="1" stopColor="#2196F3"></Stop>
            </LinearGradient>
          </Defs>
          <G id="path" stroke="none" strokeWidth="1" fill={type} fillRule="evenodd" transform="translate(444.597631, 610.750000) scale(-1, 1) rotate(-180.000000) translate(-444.597631, -610.750000)">
            <Path d="M428.5,1219.8 C413.2,1215.9 403,1207.3 395.6,1192 C394,1188.6 393.6,1185.1 393.2,1167.6 L392.8,1147.3 L389.4,1147.8 C386.4,1148.3 385.8,1148 384.6,1145.7 C381.8,1140.1 381.7,1135.3 384.5,1127.4 C386,1123.3 387.5,1118.4 387.9,1116.5 C388.8,1112.5 391.7,1106.5 392.8,1106.5 C395.2,1106.4 397.4,1102.9 398.7,1096.8 C400.9,1087.1 400.8,1049 398.5,1046.5 C397.7,1045.6 397,1044.5 397,1044.1 C397,1042.1 390.8,1035.7 386.8,1033.7 C377.4,1028.7 371.6,1025.2 364.2,1020.1 L356.5,1014.7 L342.5,1014.2 C315.5,1013.4 301.4,1005.7 287.1,984 C280.1,973.5 278.7,971.2 277,968 C276.4,966.9 275.1,964.7 274,963 C272.9,961.4 271.7,959.3 271.3,958.5 C270.9,957.7 268.7,953.9 266.5,950 C264.2,946.2 262.1,942.3 261.7,941.5 C261.3,940.7 260.2,938.7 259.2,937 C258.2,935.4 255.6,930.9 253.5,927 C251.4,923.2 248.1,917.1 246.2,913.5 C240.8,903.6 236.6,895.8 232,887 C227.5,878.3 226.5,876.6 220.6,867.8 C211.7,854.7 204.7,846.5 193.9,836.5 C174.2,818.3 168.2,811.6 158.2,796.5 C152.8,788.5 148.3,781.6 148,781 C147.7,780.5 145.3,776.6 142.6,772.5 C136.6,763.5 105,732.1 95.5,725.8 C88.6,721.1 89.5,721.2 80.3,725.1 C78.6,725.9 75.4,726.5 73.2,726.5 C71,726.5 67.6,727.2 65.7,728 C63.7,728.8 59.8,729.5 57,729.5 C54.3,729.5 47.4,730.2 41.9,731 C36.3,731.9 30.9,732.3 29.9,732 C26.3,730.8 26.2,722.7 29.8,719.8 C33.4,716.8 39.7,714.5 44.2,714.5 C47.1,714.5 49.5,713.9 50.4,712.9 C52.4,710.9 52.5,711.5 48.9,705.3 C43.3,695.8 33,684.6 23.1,677.1 C14.4,670.5 2.9,658.4 0.6,653.5 C0.1,652.5 0.1,650.4 0.4,648.9 C1,646.5 1.4,646.3 4.6,646.8 C6.8,647.2 9.9,649 13.1,651.9 C18.8,657 34.1,667.5 35.8,667.5 C38.8,667.5 36.3,664.5 28.1,658 C17.3,649.4 14.3,645.5 15.6,641.7 C16.5,639.2 17,639 22.5,639 C28,639 28.5,638.8 28.8,636.7 C29.4,632.8 37.6,631.4 39.8,634.9 C40.7,636.4 52.6,645.5 53.6,645.5 C54,645.5 54.9,646.3 55.6,647.3 C56.3,648.2 57,648.5 57,647.8 C57,647.2 53.9,643.4 50,639.3 C44.3,633.4 43,631.4 43,628.8 C43,625.1 44.2,624.7 49.4,626.9 C53.4,628.5 64.7,637.9 71,644.6 C73.5,647.3 78.2,650.9 81.5,652.6 C97.9,661.3 102.4,665.2 107.7,675.3 C111.8,683.1 115.3,686.1 131.5,695.8 C132.6,696.5 135.4,698.2 137.8,699.8 C140.2,701.3 142.3,702.5 142.4,702.5 C143.9,702.5 166.8,720 174.4,727 C175,727.6 178,730 181,732.5 C184,735 186.7,737.2 187,737.6 C187.3,737.9 192,741.9 197.5,746.5 C211.5,758.1 219.7,766.6 235,785 C242.8,794.5 260.1,812.9 277.2,830.1 C302.7,855.7 312.8,866.9 313,869.8 C313,870.3 315.1,873.3 317.6,876.6 C322.3,882.8 325,884.1 325,880.3 C325,879 327.1,873.1 329.6,867 C334.2,856.1 336.1,851.3 338.5,844.5 C341.5,836.1 342.2,833.8 343,831 C343.5,829.4 344.3,826.7 344.8,825 C348.6,813.8 349,810.7 349,789.4 C349,777.6 348.3,761.7 347.5,754 C346.7,746.3 346,734.2 346,727 C346,715.4 345.7,713 342.9,704 C341.2,698.5 339.2,692.5 338.4,690.7 C337.6,688.9 337,686.8 337,686 C337,685.2 336.4,683.1 335.6,681.3 C334.1,677.9 332.4,671.3 329.5,658.5 C328,651.5 323.8,639.7 320.4,633.2 C319.6,631.6 319,629.6 319,628.6 C319,627.7 318.5,626.4 317.9,625.8 C317.3,625.2 316.5,623.2 316,621.4 C315.5,619.5 314.1,614.9 312.7,611 C311.4,607.2 309.5,601.3 308.5,598 C307.5,594.7 306.2,590.2 305.5,588 C303.5,581.5 300.6,570.9 296.5,556 C295.6,552.7 294.2,547.9 293.4,545.4 C292.6,542.8 292,539.7 292,538.5 C292,537.2 291.4,533.9 290.6,531.1 C285.9,514.7 284.1,476 287.3,461.5 C291.7,441.2 292.1,436.7 290.5,427.6 C287.8,412.6 284.5,398.4 281.5,389 C279.5,382.8 277.3,373.8 275.5,364.5 C274.6,359.8 273.3,354.7 272.5,353 C271,349.5 268.3,342.5 266.5,337.5 C263,327.8 261.9,322.9 260.5,311 C259.7,303.9 258.3,293.3 257.5,287.5 C256.7,281.7 255.4,271.8 254.6,265.5 C253.8,259.2 252.6,250.2 252,245.5 C251.3,240.8 250.5,230.9 250,223.5 C249.5,216.1 248.7,205.3 248.1,199.5 C247.6,193.7 246.9,182.3 246.5,174 C245.6,151.6 244.3,144.3 239.9,136.5 C239.4,135.7 238.5,134.1 238,133 C237.4,131.9 236.1,129.7 235.1,128 C230.2,120.4 229.2,117.6 228.5,109.5 C227.9,102.6 227.1,99.6 224.1,93.5 C222.1,89.4 219.6,83.1 218.6,79.5 C217.6,75.9 214.8,69.1 212.4,64.4 C210,59.6 208,54.7 208,53.5 C208,52.3 206.6,49.3 205,46.8 C203.3,44.3 201.2,39.3 200.4,35.7 C199.2,30.3 198.1,28.4 194.4,24.7 C189.4,19.6 189,17.4 192,11.6 C195.6,4.4 198.6,3.5 218.3,3.5 C232.3,3.5 236.5,3.8 240.6,5.3 C252.7,9.5 255.1,13.3 257.4,31 C258.3,38.2 259,45.4 259,47.1 C259,53.3 268.6,69.5 272.2,69.5 C273.8,69.5 283.8,77.6 286.3,80.8 C292.3,88.8 292,96.6 284.8,120.4 C283.7,123.9 284.9,134.8 287.5,145.5 C288.2,148.5 289.4,153.3 290,156 C290.7,158.8 291.6,162.8 292.1,165 C292.5,167.2 293.9,171.5 295,174.5 C296.2,177.5 297.6,181.4 298,183 C298.5,184.7 302,195.2 305.8,206.5 C314.2,231.5 316,237.5 316,240.4 C316,241.7 316.6,243.9 317.4,245.3 C318.9,248.2 324.3,259.8 326.6,265.2 C327.4,267 328.6,270 329.4,271.7 C331.4,276.5 333,285.6 333.6,296.5 C334.5,313.4 337.2,336.9 338.5,339.5 C339.3,340.9 342.9,348.2 346.7,355.7 C350.4,363.3 355,372.3 356.7,375.7 C358.5,379.2 360.4,383.4 360.9,385 C361.8,388 363.1,391.7 365.5,398.5 C366.2,400.4 367.6,404.7 368.5,408 C369.5,411.3 370.8,415.6 371.5,417.5 C372.2,419.4 373.6,423.7 374.5,427 C375.5,430.3 376.8,434.6 377.5,436.5 C378.2,438.4 379.3,441.6 379.9,443.5 C380.6,445.4 381.5,448.4 382,450 C382.7,452.9 387,461.2 391.5,468.5 C397.3,478 409.5,504.4 412,513 C413.1,517 415.8,524.1 416.9,526.3 C417.4,527.2 418.6,530 419.5,532.5 C421.9,539 424.5,545 429.1,554.9 C432.9,563.2 441.1,570.5 446.5,570.5 C449.2,570.5 455.6,566.8 459.8,562.7 C463.5,559.1 469,549.2 469,546 C469,545.2 469.6,543.4 470.4,541.8 C471.2,540.3 473.3,535.4 475.1,531 C476.9,526.6 480.7,519.2 483.5,514.6 C490.2,503.4 489.9,503.8 494.6,497 C496.8,493.6 498.9,490.3 499.3,489.5 C499.7,488.7 500.9,486.7 502,485 C505.8,479.1 517.5,454.2 520,446.5 C520.5,445.1 521.8,441.5 523,438.5 C524.2,435.5 525.5,431.9 526,430.5 C526.5,429.1 527.8,425.5 529,422.5 C530.2,419.5 531.5,415.7 532,414 C532.8,411.1 533.8,408.2 536.5,400.5 C537.2,398.6 539.2,392.3 541,386.5 C542.8,380.7 546.9,370.6 550.1,364 C553.4,357.4 556,351.6 556,351.1 C556,350.7 557.4,348.6 559,346.4 C561.9,342.8 562.1,342.1 562.6,331.3 C562.8,325.1 563.5,310.3 564.1,298.5 C565.4,274.6 565.9,272.7 574.9,259.5 C580.2,251.8 583,246.1 583,243.1 C583,241.7 583.4,239.5 584,238.1 C584.5,236.7 585.4,232.3 585.9,228.3 C587.2,218.5 589.4,209.2 592,202.5 C596.2,191.4 597.2,188.9 598,186 C598.4,184.4 599.4,181.4 600.1,179.5 C606.3,161.6 606.9,159.1 608,146.5 C609.2,132.9 608.1,115.4 605.4,105.6 C604.5,102.6 603.8,96.2 603.7,91.4 L603.5,82.6 L607.5,78.5 C609.7,76.2 615.2,71.6 619.6,68.3 C627,62.9 627.9,61.8 629.3,57.1 C631.6,49.4 634,37.5 634,33.5 C634,27.9 639.6,12.1 643.5,7 C646.9,2.5 656.3,0.5 676,0.2 L691.5,0 L697,3.4 C700,5.2 703.3,7.4 704.3,8.3 C706.4,10.1 706.6,17.1 704.7,20 C704,21.1 701.9,25.6 700,30 C698.2,34.4 696.1,38.7 695.5,39.5 C694.9,40.3 693.4,43 692.2,45.5 C690.9,48 689,51.4 688,53 C687,54.7 684.9,58.3 683.4,61 C682,63.8 680,67.1 679,68.5 C676.2,72.6 673,80.2 673,83 C673,85.5 668.1,96.4 665.8,99.3 C665.2,100 664.4,102.5 664,104.8 C662.3,114.7 659.4,123.6 656.6,127.4 C652.9,132.3 652.7,135.2 652.5,184.5 C652.3,220.4 651.8,237 650.6,248.5 C649.7,257 649,268.1 649,273 C649,278 648.5,284.7 647.9,288 C647.3,291.3 646.5,296.5 646.1,299.5 C645.6,302.5 644.7,307.3 644,310 C643.4,312.8 642.1,317.7 641.3,321 C637.2,337.7 634,348.5 632.1,352.3 C629.2,358.1 628,362.1 628,366.3 C628,370.4 627.5,371.6 625,374 C622.1,376.8 622,377.2 622,385.6 C622,393.8 621.8,394.6 617.5,403.3 C615,408.3 613,413.4 613,414.7 C613,416.1 612.4,419.4 611.6,422.1 C609.3,430.1 609,437 610,455 C612.2,493.2 612.3,499.3 611.1,505.7 C608.6,518.2 605.2,532.4 599.5,553 C598.6,556.3 597.2,561.4 596.4,564.3 C595.6,567.1 594.4,571.9 593.6,574.8 C590.5,585.8 588.4,593.1 584.4,606 C583.4,609.3 578.8,619.4 574.2,628.5 C566,644.7 562,654.6 562,658.9 C562,660 561.4,663.9 560.5,667.5 C559.7,671.1 558.3,677.6 557.4,682 C553.8,699.6 552.8,704.1 551.8,707 C549.3,714.4 548.1,724.5 547.6,745 C547.2,757.1 546.5,773.4 545.8,781.2 C544.6,796.1 545.3,803.8 548.6,814.8 C549.4,817.4 550.6,821.6 551.4,824.3 C555.5,838.3 556.4,841.3 557.5,844.5 C561.4,855.6 564.6,865.5 565.9,870.3 C567.3,875.1 569.6,875.9 570.6,871.8 C570.9,870.2 572.5,866.2 574.2,862.8 C577.2,856.5 582.6,850.2 602.9,828.9 C625.4,805.4 628.8,801.4 632.6,794.5 C638.8,783.1 666.2,753.3 686.5,735.9 C693.1,730.2 711.3,716.4 715.5,713.8 C718.2,712.2 735.5,701.4 738.5,699.5 C753.9,689.6 771.1,676.4 774.6,671.8 C776.2,669.7 778.4,666.4 779.4,664.5 C782.7,658.5 787.7,652.5 792.2,649.1 C799,643.9 806.5,639.2 814,635.4 C816.5,634.1 821.7,630.8 825.5,627.9 C829.4,625 833.7,622.2 835.2,621.6 C838.6,620.3 843.7,621.2 844.4,623.1 C845.1,624.9 848.4,624.9 850,623 C851.7,621 857.4,620.1 859.9,621.4 C861.1,622.1 862,623.6 862,625 C862,627.9 863.6,629.1 865.5,627.5 C866.5,626.6 869,626.5 873.4,627 C877.5,627.4 880.6,627.2 881.9,626.5 C885.2,624.8 889,627.8 889,632.1 C889,637.7 883.7,646.4 876.9,651.9 C873.6,654.6 868.8,659.5 866.2,662.9 C858.9,672.4 859,672.3 850,682 C845.3,687 840.6,692.8 839.5,694.8 C837.7,698.2 837.7,698.6 839.2,700.1 C840.4,701.3 842.9,701.7 850.6,701.6 C864.5,701.6 869.6,703.6 868.3,708.6 C867.6,711 857.3,715.7 848.5,717.5 C846.3,718 843.2,718.9 841.5,719.5 C836.7,721.3 827.7,721.2 824.7,719.2 C823.1,718.2 820.1,717.5 817.2,717.5 C814.6,717.5 809.8,716.8 806.7,716 C803.5,715.2 800.2,714.5 799.4,714.5 C796.6,714.5 768.2,739.4 748.5,759.2 C744.3,763.4 738.9,771.3 730.5,785.3 C724.1,796 711,813.2 704.8,819 C701.9,821.8 693,830.1 685,837.5 C668.6,852.6 668.5,852.8 662.2,861 C659.6,864.3 657,867.6 656.3,868.3 C655.6,869 652.9,872.4 650.3,875.8 C647.7,879.2 645,882.6 644.3,883.3 C643.6,884 640.9,887.4 638.3,890.8 C635.7,894.2 633.3,897.2 633,897.5 C631.3,898.8 625,908.6 625,909.9 C625,910.7 624.6,911.6 624.1,912 C622.7,912.8 619.8,923 619,929.5 C617.7,940 612.3,959.2 608.4,966.8 C607.6,968.4 607,970.1 607,970.7 C607,972.5 598,985.1 592.7,990.7 C580.1,1004 567.5,1010.7 553,1012 C546.3,1012.6 543.9,1013.4 530.5,1020.2 C522.3,1024.3 514.2,1028.5 512.5,1029.6 C510.9,1030.6 508.6,1031.9 507.5,1032.5 C500.3,1036.1 497.1,1039 492.2,1046.2 L487.7,1053 L488.7,1069.5 C489.4,1080.1 490.3,1087.3 491.3,1089.5 C492.1,1091.4 493.5,1095.4 494.4,1098.3 C495.2,1101.2 497.1,1105.1 498.5,1106.9 C499.9,1108.7 501.4,1112.2 501.9,1114.6 C502.5,1117 503.9,1122.4 505,1126.5 C507.7,1135.8 507.3,1144 503.9,1146.8 C502.7,1147.7 501.2,1148.5 500.5,1148.5 C498.5,1148.5 498.3,1150.4 499.2,1160.5 C500.4,1172.5 499.6,1185 497.4,1190.1 C491,1204.6 483.9,1214.3 476.6,1218.5 L471.5,1221.5 L453,1221.4 C440.1,1221.3 432.7,1220.9 428.5,1219.8 Z"></Path>
          </G>
        </Svg>
      </View>
    );
  }
}

class Core4ScoreStatusPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zone: {
        active: false,
        score: 3
      },
      power: {
        active: false,
        score: 4
      }
    };
  }

  render () {
    const {zone, power} = this.state;
    const {score} = this.props;
    return (
      <View style={[gstyles.container, gstyles.flexRow, styles.statusPanel]}>
        <View style={[gstyles.container, gstyles.flexColumn, styles.scoreBoard]}>
          <View style={[gstyles.container, gstyles.flexRow, styles.core4Scores]}>
            <Text style={[styles.scoreText, styles.totalScore]}>{score}</Text>
            <Text style={[styles.scoreText, styles.maxScore]}>/4</Text>
          </View>
          <View style={[styles.horizontalBar, !zone.active && !power.active ? {display: 'none'} : {}]} />
          <View style={[styles.addonScores, gstyles.flexRow]}>
            { zone.active && (
                <View style={[gstyles.container, gstyles.flexColumn, styles.addonScoreArea]}>
                  <View style={styles.addonScoreLabel}><Text style={styles.addonScoreLabelText}>ZONE</Text></View>
                  <Text style={[styles.scoreText, styles.addonScore]}>{zone.score}</Text>
                </View>
              )
            }
            { power.active && (
                <View style={[gstyles.container, gstyles.flexColumn, styles.addonScoreArea]}>
                  <View style={styles.addonScoreLabel}><Text style={styles.addonScoreLabelText}>POWER</Text></View>
                  <Text style={[styles.scoreText, styles.addonScore]}>{power.score}</Text>
                </View>
              )
            }
          </View>
        </View>
        <View style={[gstyles.container, styles.statusBoard]}>
          <Core4Dude max={4} score={score} />
          {/*<Image style={styles.statusLevel} resizeMode={'contain'} source={require('../assets/images/stack/power-active.png')} />*/}
        </View>
      </View>
    );
  }
}

class Core4Screen extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
    };
  }

  componentDidMount() {
    const weekId = moment().format('Y') + '' + moment().format('WW');
    const dayId = moment().format('Y') + '' + moment().format('MM') + '' + moment().format('DD');
    this.props.getCore4Data({weekId, dayId});
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.challenge.id !== nextProps.challenge.id && nextProps.challenge.id) {
      const weekId = moment().format('Y') + '' + moment().format('WW');
      const dayId = moment().format('Y') + '' + moment().format('MM') + '' + moment().format('DD');
      this.props.getCore4Data({weekId, dayId});
    }
  }

  render () {
    const {core4} = this.props;
    return (
      <View style={[gstyles.container, gstyles.gameContainer, gstyles.core4Container]}>
        {/*<View style={[gstyles.container, styles.dateNavigation]}>
          <TouchableOpacity>
            <Text style={[styles.dateOption, styles.activeDateOption]}>Today</Text>
          </TouchableOpacity>
          <View style={styles.dateNavigationSeparator}></View>
          <TouchableOpacity>
            <Text style={styles.dateOption}>This Week</Text>
          </TouchableOpacity>
        </View>*/}
        <ScrollView>
          <View style={gstyles.container}>
            <Core4ScoreStatusPanel score={core4.completedTasks} />
          </View>
          <View style={gstyles.container}>
            <Core4Elites {...this.props}/>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    core4: state.core4 || {},
    challenge: state.user && state.user.challenge || {},
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    getCore4Data: (daySet) => dispatch(getCore4Data(daySet)),
    updateCore4Data: (daySet, data) => dispatch(updateCore4Data(daySet, data)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Core4Screen);

