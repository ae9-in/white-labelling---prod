# 75 Places Across 9 Zones - Complete List

## Bangalore South (9 places)
1. Banashankari
2. Jayanagar
3. Jp nagar
4. BTM layout
5. Uttarahalli,Padmanabanagar
6. Bommanahalli
7. Koramangala
8. RR nagar
9. Basavanagudi

## Bangalore North (9 places)
10. Yelahanka
11. Vidyaranyapura
12. Sahakarnagar
13. Hebbal
14. RT Nagar
15. Thanisandra
16. Kodigehalli ,Jakkur
17. Sanjaynagar &RMV extenstion
18. Mathikere

## Bangalore Central (9 places)
19. Ashoknagar
20. Malleshwaram
21. Church street, Mg road , Brigade road
22. Sadashivnagar
23. Ulsoor
24. Bel Circle
25. Shivajinagar, Commercial street
26. Vasanth nagar & Guttahalli
27. Rajajinagar+Sheshadripuram

## Bangalore East (9 places)
28. Whitefield
29. Marathahalli
30. Indiranagar
31. HSR layout
32. KR Puram
33. Cv Raman Nagar
34. Mahadevpura
35. Bellandur
36. Sarjapur

## Bangalore West (9 places)
37. Jalahalli
38. Yashwanthpur
39. Vijayanagar
40. Kengeri
41. Nagarbhavi
42. Peenya
43. Vijayanagar
44. Basaveshwaranagar
45. Nayandahalli,Hanumanthnagar

## Bangalore Rural (9 places)
46. Devanahalli
47. Dodaballapura
48. Hoskote
49. Airport Road Bangalore
50. Tumkur Road
51. Vijayapura
52. Nelamangala
53. Magadi
54. Hesarghatta

## Mysore Road (8 places)
55. Bidadi
56. Ramnagar
57. Kanakpura
58. Channapatna
59. Maddur
60. Mandya
61. Srirangapatna
62. Other side of Mysore

## Hosur (4 places)
63. Bagalur Road
64. Mathigiri
65. Dankanikottai Road
66. Anthivadi Hosur

## Mysore (9 places)
67. Vijayanagar
68. Gokulam
69. Kuvempunagar
70. Jayanagar
71. Bannimantap,Palace road
72. Yadavgiri
73. Brindavan Extension
74. Siddhartha Nagar
75. Chamundipuram

---

## Implementation Details

### Files Updated:
1. **Backend**: `backend/src/config/constants.js`
   - PLACES object with all 75 places mapped to their zones
   
2. **Frontend**: `frontend/src/constants/places.js`
   - PLACES_BY_ZONE object with all 75 places organized by zone
   - Used in cascading dropdowns (Zone → Place)

### Features:
- ✅ Exact place names as specified (including capitalization and punctuation)
- ✅ Combined places kept together (e.g., "Uttarahalli,Padmanabanagar")
- ✅ Cascading dropdown: Select zone first, then place options appear
- ✅ All 75 places available in shop creation/editing forms
- ✅ Zone and place filtering in shop list page

### Usage in Application:
1. **Shop Form**: Select zone → Select place from filtered list
2. **Shop List**: Filter by zone and/or place
3. **Database**: Stores exact place name and zone for each shop
4. **Reports**: Can filter and group by zone/place

### Note on Duplicate Names:
- "Vijayanagar" appears in both Bangalore West (#39, #43) and Mysore (#67)
- "Jayanagar" appears in both Bangalore South (#2) and Mysore (#70)
- These are treated as separate places based on their zone context
